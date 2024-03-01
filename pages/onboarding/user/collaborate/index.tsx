import { GetServerSidePropsContext } from 'next';
import { makeAuthedApiRequest } from '../../../../src/utils/api/apiHelper';
import CollaboratePage from '../../../../src/components/reactPages/Collaborate';
import { useRouter } from 'next/router';

const Collaborate = () => {
    const router = useRouter();
    return (
        <CollaboratePage/>
    )
}
export default Collaborate;