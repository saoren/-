/*
 * @Author: L.柠
 * @Date: 2022-03-12 15:33:16
 */
import { request } from 'umi';

export async function login(body: API1.LoginParams, options?: { [key: string]: any }) {
    return request<API1.LoginResult>('http://127.0.0.1:9000/manage/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

export async function permission(body: any, options: any, token?: string) {
    return request<API1.LoginResult>('http://127.0.0.1:9000/manage/authority', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cms-token': token
        },
        data: body,
        ...(options || {}),
    });
}