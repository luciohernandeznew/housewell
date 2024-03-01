import axios, {AxiosResponse} from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import { baseURL } from '../../constants';


export type Methods = 'get' | 'post' | 'put' | 'delete' | 'update';

export type makeAuthedApiRequestParams = {
  method: Methods;
  urlExtension: string;
  data?: any;
  isServer?: boolean;
  req?: IncomingMessage;
  res?: ServerResponse;
  headers?: any;
}
export async function makeAuthedApiRequest( params: makeAuthedApiRequestParams): Promise<AxiosResponse> {
  const { method, urlExtension, data, isServer, req, res, headers } = params;
    if (!isServer) {
      return axios({
        url: `${baseURL}${urlExtension}`,
        method,
        data,
        withCredentials: true,
        headers: {
          ...headers
        }
      });
    }
    return axios({
      url: `${baseURL}${urlExtension}`,
      method,
      data,
      headers: {
        ...headers,
        cookie: req?.headers.cookie // Forward the cookies
      }
    });
}