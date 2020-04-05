import axios, { AxiosResponse } from 'axios';
import { IMeeting } from '../models/meeting';
import { resolve } from 'dns';
import { IUser, IUserFormValues } from '../models/user';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (Response: AxiosResponse) => Response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {})=>axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Meetings = {
    list: (): Promise<IMeeting[]> => requests.get('/meetings'),
    details: (id: string) => requests.get(`/meetings/${id}`),
    create: (meeting: IMeeting) => requests.post('/meetings', meeting),
    update: (meeting: IMeeting) => requests.put(`/meetings/${meeting.id}`, meeting),
    delete: (id: string) => requests.del(`/meetings/${id}`)
}

const Users = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user),
}

export default {
    Meetings
}