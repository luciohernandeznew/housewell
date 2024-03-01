import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapProperty } from '../boxes/properties/SidebarPropertyBox';
import { Feature, FeatureCollection, Point } from 'geojson';
import { useRouter } from 'next/router';
import { mapboxApiKey } from '../../constants';


// ...
export type GeoJSONProperty = Feature<Point, MapProperty>;
export type GeoJSONFeatureCollection = FeatureCollection<Point, MapProperty>;


mapboxgl.accessToken = mapboxApiKey;
const PropertyViewMap = ({ properties }: { properties: GeoJSONProperty[] }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        const goToPropertyListing = (id: string) => {
            router.push(`/property-listing?propertyId=${id}`);
        };


        if (mapContainerRef.current !== null) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/bryantpa/clkbjgg4u03k201qv4qfi9fzy',
                center: [-84.3371, 33.8650],
                zoom: 9,
                scrollZoom: true,
            });
    
            const geojson: GeoJSONFeatureCollection = {
                type: "FeatureCollection",
                features: properties
            };
            map.on('click', 'properties', function (e) {
                if (e.features && e.features.length > 0 && e.features[0].properties) {
                    const propertyId = e.features[0].properties.id;
                    goToPropertyListing(propertyId);
                }
            });
    
            map.on('load', () => {
                let hoveredStateId: string;
                map.loadImage(
                    '/map_icon.png',
                    function (error, image) {
                        if (error) throw error;
                        if (!image) {
                            console.error("Image didn't load correctly.");
                            return;
                        }
                        map.addImage('background_icon', image);
            
                        map.loadImage(
                            '/map_icon_hover.png',
                            function (error, image_hover) {
                                if (error) throw error;
                                if (!image_hover) {
                                    console.error("Image didn't load correctly.");
                                    return;
                                }
                                map.addImage('background_icon_hover', image_hover);
            
                                map.addSource('properties', {
                                    type: 'geojson',
                                    data: geojson,
                                });
                                map.addLayer({
                                    id: 'properties',
                                    type: 'symbol',
                                    source: 'properties',
                                    layout: {
                                        'icon-image': 'background_icon',
                                        'icon-allow-overlap': true,
                                        'icon-size': 0.5,
                                        'text-field': ['get', 'price'],
                                        'text-size': 15,
                                        'text-offset': [0.5, -0.2],
                                    },
                                    paint: {
                                        'text-color': '#1B311C'
                                    },
                                    'filter': ['!=', 'id', 'hover-id'], 
                                });
                                
                                map.addLayer({
                                    id: 'properties_hover',
                                    type: 'symbol',
                                    source: 'properties',
                                    layout: {
                                        'icon-image': 'background_icon_hover',
                                        'icon-allow-overlap': true,
                                        'icon-size': 0.5,
                                        'text-field': ['get', 'price'],
                                        'text-size': 10,
                                        'text-offset': [0.5, -0.2],
                                    },
                                    paint: {
                                        'text-color': '#1B311C'
                                    },
                                    'filter': ['==', 'id', 'hover-id'],  // Only show hovered feature
                                });
            
                                let popup = new mapboxgl.Popup({
                                    closeButton: false,
                                    closeOnClick: false,
                                    className: 'map-popup',
                                });
                            
                                // When the mouse leaves the feature...
                                map.on('mousemove', 'properties', function (e) {
                                    if (e.features && e.features.length > 0 && e.features[0].properties) {
                                        map.setLayoutProperty('properties', 'icon-image', ['match', ['get', 'id'], e.features[0].properties.id, 'background_icon_hover', 'background_icon']);
                                        if (e.features && e.features.length > 0 && e.features[0].properties) {
                                            const content = `
                                                <div class="map-popup">
                                                    <img src="${e.features[0].properties.imageUrl}" alt="Property image" style="width: 200px; height: 130px;" />
                                                    <p>${e.features[0].properties.streetAddress}</p>
                                                    <p>${e.features[0].properties.bedrooms} Beds ${e.features[0].properties.bathrooms} Baths, ${e.features[0].properties.squareFeet} sqft</p>
                                                </div>
                                            `;
                                
                                            // Update the popup's location and content
                                            popup.setLngLat(e.lngLat)
                                                .setHTML(content)
                                                .addTo(map);
                                        }
                                    }
                                });
                                
                                map.on('mouseleave', 'properties', function () {
                                    map.setLayoutProperty('properties', 'icon-image', 'background_icon');

                                    popup.remove();
                                });
                                
                            }
                        );
                    }
                );
            });
            

    
            return () => map.remove();
        }
    }, [properties]);

    return (
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    );
};

export default PropertyViewMap;
