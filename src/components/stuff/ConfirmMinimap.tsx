import React, { MutableRefObject, use, useEffect } from 'react';
import { AddressMinimap } from '@mapbox/search-js-react';
import { colors } from '../../styles/colors';
import { useDevice } from "../../contexts/DeviceContext";
import { mapboxApiKey } from '../../constants';


type AddressMinimapComponentProps = {
    show: boolean;
    feature: GeoJSON.Feature<GeoJSON.Point>;
    longitude: MutableRefObject<number>;
    latitude: MutableRefObject<number>;
};
const themeObject = {
    icons: {
        marker: `<svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.836 30.9031C12.4545 30.9031 23.507 18.8317 23.507 12.2428C23.507 5.65388 18.2816 0.3125 11.836 0.3125C5.39029 0.3125 0.165039 5.65388 0.165039 12.2428C0.165039 18.8317 11.2174 30.9031 11.836 30.9031ZM11.836 18.21C15.104 18.21 17.7532 15.5018 17.7532 12.1612C17.7532 8.82063 15.104 6.11255 11.836 6.11255C8.56804 6.11255 5.91884 8.82063 5.91884 12.1612C5.91884 15.5018 8.56804 18.21 11.836 18.21Z" fill="#0DBF9B"/>
        </svg>
        `,
    },
    variables: {
        colorPrimary: colors.darkgreen1000,
        fontFamily: 'Mint Grotesk Medium',
        colorBackground: colors.background,
        paddingModal: '100px'
    }
}

export default function AutofillCheckoutDemo(props: AddressMinimapComponentProps) {
    function handleSaveMarkerLocation(coordinate: [number, number]) {
		props.longitude.current = coordinate[0];
        props.latitude.current = coordinate[1];
	}
    const { isMobile } = useDevice();
    const [width, setWidth] = React.useState<string>('500px');
    useEffect(() => {
        setWidth('100%');
    }, [isMobile]);
	

	return (
        <div style={{height: isMobile ? '450px' : "500px", width}}>
        <AddressMinimap
            theme={themeObject}
            accessToken={mapboxApiKey}
            canAdjustMarker={true}
            satelliteToggle={true}
            feature={props.feature}
            show={props.show}
            footer={false}
            onSaveMarkerLocation={handleSaveMarkerLocation}
        />
        </div>
	);
};

