import { AxiosInstance, AxiosResponse } from 'axios';
import axiosConnection from './axios-connection';

export interface ApiConnection {
  get<TResp, TParams = {} | void>(url: string, params?: TParams): Promise<TResp>;
  post<TReq, TParams = {} | void, TResp = TReq>(url: string, data: TReq, params?: TParams): Promise<TResp>;
  put<TReq, TParams = {} | void, TResp = TReq | void>(url: string, data: TReq, params?: TParams): Promise<TResp>;
  delete<TParams = {} | void>(url: string, params?: TParams): Promise<void>;
}

class AxiosApiConnection implements ApiConnection {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public async get<TResp, TParams = {} | void>(url: string, params?: TParams): Promise<TResp> {
    const resp = await this.axiosInstance.get<TResp>(url, { params });
    return resp.data;
  }

  public async post<TReq, TParams = {} | void, TResp = TReq>(url: string, data: TReq, params?: TParams): Promise<TResp> {
    const resp = await this.axiosInstance.post<TReq, AxiosResponse<TResp>>(url, data, { params });
    return resp.data;
  }

  public async put<TReq, TParams = {} | void, TResp = TReq | void>(url: string, data: TReq, params?: TParams): Promise<TResp> {
    const resp = await this.axiosInstance.put<TReq, AxiosResponse<TResp>>(url, data, { params });
    return resp.data;
  }

  public async delete<TParams = {} | void>(url: string, params?: TParams): Promise<void> {
    await this.axiosInstance.delete(url, { params });
  }
}

const connection = new AxiosApiConnection(axiosConnection);

export default connection;
