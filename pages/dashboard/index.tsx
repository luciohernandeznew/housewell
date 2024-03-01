import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import DashboardChecklist from "../../src/components/dashboard/DashboardChecklist";
import DashboardPropertylist from "../../src/components/dashboard/DashboardPropertyList";
import { useAppSelector, initializeStore,} from "../../src/store";
import {fetchProperties} from "../../src/slices/properties";
import {fetchUserGroups} from "../../src/slices/groups";
import { GetServerSidePropsContext } from 'next';
import BasicParentModal from '../../src/components/boxes/modals/BasicParentModal';
import { MintParagraph } from '../../src/components/Typography/Typography';
import SecondaryButton from '../../src/components/buttons/SecondaryButton';
import { useDevice } from '../../src/contexts/DeviceContext';



const Dashboard: React.FC = () => {
  const router = useRouter();
  const propertiesReducer = useAppSelector((state) => state.propertiesReducer);
  const properties = propertiesReducer.properties;
  const { isMobile } = useDevice();

  // Determine initial state from query parameter
  const isOnboardingComplete = router.query.isOnboardingComplete === 'true';
  const [showFinishedModal, setShowFinishedModal] = useState(false);

  const closeModal = () => {
      setShowFinishedModal(false);

      const currentPath = router.pathname;
      router.push(currentPath, currentPath, { shallow: true });
  };

  useEffect(() => {
      if (!router.isReady) return;

      // Update the state based on the initial query parameter
      setShowFinishedModal(isOnboardingComplete);
  }, [router.isReady, router.query.isOnboardingComplete, isOnboardingComplete]);

  return (
      <div>
          <div style={{ margin: "0 5%" }}>
              <DashboardPropertylist properties={properties} status={propertiesReducer.status} />
              <DashboardChecklist />
          </div>
          {showFinishedModal && (
              <BasicParentModal closeModal={closeModal}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'flex-start', padding: '12px', }}>
            
                  <MintParagraph size={isMobile ? "32" : '24'} weight="medium">Congrats, Onboarding Complete!</MintParagraph>
                  <MintParagraph size={isMobile ? '16' : '18'} weight="regular" style={{ marginTop: "16px", marginBottom: "72px" }}>You&apos;re almost ready to get officially listed on the MLS, Zillow, Realtor.com, and others! Your Housewell adivsor Josh should reach out soon to schedule photography, sign the listing agreement, and fill out your seller&apos;s disclosure.</MintParagraph>

                  <SecondaryButton size="medium" onClick={closeModal} text="Acknowledge" hasArrow style={{ width: "100%" }} />
                  </div>

              </BasicParentModal>
          )}
      </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    // Fetch the data for properties
    const store = initializeStore();
    await Promise.all([
      store.dispatch(fetchProperties({ isServer: true, req: context.req, res: context.res })),
      store.dispatch(fetchUserGroups({ isServer: true, req: context.req, res: context.res }))
    ]);
    // Get only the part of the state that has changed (propertiesReducer in this case)
    const { propertiesReducer, groupsReducer } = store.getState();
    return { props: { initialState: { propertiesReducer, groupsReducer } } };
  } catch (error) {
    console.log("ERROR", error);
    return { props: { basicAddressData: false } };
  }
}
  


export default Dashboard;