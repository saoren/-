/*
 * @Author: L.柠
 * @Date: 2022-03-13 15:37:49
 */

import { request } from 'umi';

export async function getuser() {
    return request('http://127.0.0.1:9000/manage/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function banUser(body: User.userban, options: any, token: string | null) {
    return request<API1.LoginResult>('http://127.0.0.1:9000/manage/ban', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cms-token': token
        },
        data: body,
        ...(options || {}),
    });
}
export async function notBanUser(body: User.userban, options: any, token: string | null) {
    return request<API1.LoginResult>('http://127.0.0.1:9000/manage/ban/de-archive', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cms-token': token
        },
        data: body,
        ...(options || {}),
    });
}
export async function userEdit(body: User.user, options: any, token: string | null) {
    return request<API1.LoginResult>('http://127.0.0.1:9000/manage/user/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cms-token': token
        },
        data: body,
        ...(options || {}),
    });
}
