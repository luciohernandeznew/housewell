import { GetServerSidePropsContext } from 'next';
import { makeAuthedApiRequest } from '../../../../../src/utils/api/apiHelper';
import SearchAddress, { SearchAddressProps } from '../../../../../src/components/reactPages/onboarding/AddressAutocompletePage';

const SearchAddressPage = (props: { basicAddressData: SearchAddressProps}) => {

    return (
       <SearchAddress addressdata={props.basicAddressData}/>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { req, res, query } = context;
        const propertyId = query.propertyId;
        if (!propertyId) {
            return { props: {} };
        }
        const data = { propertyId };
        const response = await makeAuthedApiRequest({method: 'get', data, urlExtension: '/v1/property/basicAddressInfo', isServer: true, req, res});
        const basicAddressData = await response?.data;
        if (!basicAddressData) {
            return { props: { basicAddressData: propertyId } };
        }
        basicAddressData.property.propertyId = propertyId;
        return { props: { basicAddressData: basicAddressData.property } };
    } catch (error) {
        console.log("ERROR", error);
        return { props: {} };
    }
}
export default SearchAddressPage;