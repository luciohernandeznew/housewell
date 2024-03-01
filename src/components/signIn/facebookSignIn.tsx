import React from 'react';
import styles from './facebookSignIn.module.css'

// using ngrok to expose localhost change as needed
// todo: move to env
const baseUrl = 'https://be77-66-108-39-29.ngrok.io';


/*
  if you're using this component with a new callbackUrlExtension
  make sure to add it to the meta dev console and that url has logic to handle callbacks
*/
function FaceBookButton(props: {callbackUrlExtension: string}) {

    const handleClick = () => {
        // Redirect the user to the Facebook login page
        window.location.href = 'https://www.facebook.com/v6.0/dialog/oauth'
        + '?client_id=487326476915865'
        + `&redirect_uri=${baseUrl}${props.callbackUrlExtension}?service=facebook`
        + '&scope=email';
    };
    
    return (
        <button className={styles.facebookButton} onClick={handleClick}>
        <span className={styles.faceBookButton_icon}></span>
          {'Facebook'}
        </button>
    );
}

export default FaceBookButton;