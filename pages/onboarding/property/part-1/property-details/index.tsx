import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { makeAuthedApiRequest } from '../../../../../src/utils/api/apiHelper';
import PropertyDetailsPage, {BasicPropertyDetails} from '../../../../../src/components/reactPages/onboarding/ConfirmPropertyDetailsPage';

const ConfirmLocation = (props: { basicAddressInfo: BasicPropertyDetails}) => {
    return (
        <PropertyDetailsPage locationData={props.basicAddressInfo}/>
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
        const basicAddressInfo = await response?.data;
        basicAddressInfo.property.propertyId = propertyId;
        return { props: { basicAddressInfo: basicAddressInfo.property } };
    } catch (error) {
        console.log("ERROR", error);
        return { props: { basicAddressData: false } }
    }

    
}

export default ConfirmLocation;