import React, { useEffect } from 'react';
import { useAppSelector } from '../../store';
// Extend the Window interface
declare global {
    interface Window {
      Intercom: any;
      intercomSettings: {
        app_id?: string;
        name?: string;
        email?: string;
        user_id?: string;
        created_at?: number;
        [key: string]: any; // Allows for any other Intercom settings
      };
    }
  }
  
    
  
const IntercomChat = () => {
    const user = useAppSelector((state) => state.userReducer.user);

    useEffect(() => {
        if (typeof window !== "undefined") {
          // Function to load Intercom script
          const loadIntercom = () => {
            if (window.Intercom) {
              // If Intercom is already loaded, update it without reloading the script
              updateIntercomSettings();
            } else {
              const script = document.createElement('script');
              script.src = 'https://widget.intercom.io/widget/ebea6ouf'; // Use your actual Intercom app ID
              script.async = true;
              script.onload = updateIntercomSettings; // Update settings after script loads
              document.body.appendChild(script);
            }
          };
    
          // Function to update Intercom settings
          const updateIntercomSettings = () => {
            window.intercomSettings = {
              app_id: 'ebea6ouf', // Use your actual Intercom app ID
              name: user?.firstName ? user?.firstName + ' ' + user?.lastName : undefined,
              user_hash: user?.intercomHash,
              email: user?.email,
              user_id: user?.id.toString(),
              created_at: user?.createdAt ? Math.floor(new Date(user.createdAt).getTime() / 1000) : undefined, // Ensure this is a Unix timestamp
            };
    
            // Update Intercom with the latest settings
            if (window.Intercom) {
              window.Intercom('update', window.intercomSettings);
            }
          };
    
          loadIntercom();
    
          return () => {
            // Cleanup: Remove the Intercom script when the component unmounts
            const intercomScript = document.querySelector('script[src="https://widget.intercom.io/widget/ebea6ouf"]');
            if (intercomScript) {
              document.body.removeChild(intercomScript);
            }
          };
        }
      }, [user]);

  return null; // This component does not render anything
};

export default IntercomChat;
