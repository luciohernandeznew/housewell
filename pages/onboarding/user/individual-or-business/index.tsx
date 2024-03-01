import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { makeAuthedApiRequest } from '../../../../src/utils/api/apiHelper';
import IndividualOrBusinessPage from '../../../../src/components/reactPages/onboarding/IndividualOrBusinessPage';

const IndividualOrBusiness = () => {

    return (
        <IndividualOrBusinessPage />
    )
}

export default IndividualOrBusiness;