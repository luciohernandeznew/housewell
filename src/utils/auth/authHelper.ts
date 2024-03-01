import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {API_PORT} from "./authGlobals";


export type AuthInfo = {
    userId: string;
    deviceUuid?: string;
}
// using ngrok to expose localhost change as needed
// todo: move to env
const baseUrlWeb = 'https://be77-66-108-39-29.ngrok.io';
const baseUrlServer = `http://localhost:${API_PORT}`;

export function getOrCreateDeviceUuid() {
    let deviceUuid = getCookie('deviceUuid');
    deviceUuid = deviceUuid || localStorage.getItem('deviceUuid');
    if (deviceUuid) {
        setCookie('deviceUuid', deviceUuid);
        return deviceUuid;
    }
    deviceUuid = uuidv4();
    localStorage.setItem('deviceUuid', deviceUuid);
    setCookie('deviceUuid', deviceUuid);
    return deviceUuid;
}


export async function getThirdPartyAuthInfo(context: any, callbackUrlExtension: string) {
    try {
        const authcode = context?.query?.code;
        if (authcode) {
          const service = context?.query?.service;
          const deviceUuid = getCookie('deviceUuid') || uuidv4();
          const callbackUrl = buildCallbackUrl(callbackUrlExtension, service); 
          const data = {
            code: authcode,
            deviceUuid,
            callbackUrl,
          }
          let authInfo
          switch (service) {
            case 'google':
              const googleAuthData = await axios({
                url: `${baseUrlServer}/v1/auth/google`,
                method: 'post',
                data: data,
              })
              authInfo = {...googleAuthData.data, deviceUuid}
              console.log("authInfo", authInfo);
              return { props: { authInfo } }
            case 'facebook':
              const facebookAuthData = await axios({
                url: `${baseUrlServer}/v1/auth/facebook`,
                method: 'post',
                data: data,
              })
              authInfo = {...facebookAuthData.data, deviceUuid }
              return { props: { authInfo } }
            // usupoorted
            case 'apple':
              const appleAuthData = await axios({
                url: `${baseUrlServer}/v1/auth/apple`,
                method: 'post',
                data: data,
              })
              authInfo = {...appleAuthData.data, deviceUuid }
              return { props: { authInfo } }
            default:
              return {  props: {}  }
          }
        }
        return {  props: {}  }
    } catch (error) {
        console.log(error)
        return {  props: {}  }
    }
}

export function buildCallbackUrl (callbackUrlExtension: string, service: string) {
  return `${baseUrlWeb}${callbackUrlExtension}?service=${service}`
}

export function useAuthRedirect(authInfo: AuthInfo, path: string) {
  const router = useRouter();

  useEffect(() => {
    if (authInfo && authInfo.userId && authInfo.deviceUuid) {
      setCookie('userId', authInfo.userId);
      setCookie('deviceUuid', authInfo.deviceUuid);
    }
    if (getCookie('userId') && getCookie('accessToken') && getCookie('refreshToken') && getCookie('deviceUuid')) {
      router.push(path);
    }
  }, [authInfo, router, path]);
}