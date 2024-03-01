import React from 'react';
import styles from './googleSignIn.module.css'


/*
  if you're using this component with a new callbackUrlExtension
  make sure to add it to the google console and that url has logic to handle callbacks
*/
function GoogleButton(props: {callbackUrl: string}) {

  const handleClick = () => {
    // Redirect the user to the Google sign-in page
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=783762212710-9d816ibe72dejmbi2tj0mtfs1v874o72.apps.googleusercontent.com'
    + `&redirect_uri=${props.callbackUrl}`
    + '&response_type=code'
    + '&scope=https://www.googleapis.com/auth/userinfo.email'
  };
  return (
    <button className={styles.googleButton} onClick={handleClick}>
    <span className={styles.googleButton_icon}></span>
      {'Google'}
    </button>
  );
}

export default GoogleButton;