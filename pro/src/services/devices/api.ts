import { request } from "umi";

/*
 * @Author: L.柠
 * @Date: 2022-03-29 11:33:41
 */
export async function devicesEdit(body: Devices.Group, options: any, token: string | null) {
    return request<API1.LoginResult>('http://127.0.0.1:9000/manage/devicegroup/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cms-token': token
        },
        data: body,
        ...(options || {}),
    });
}
export async function devicesDle(body: Devices.Group, options: any, token: string | null) {
    return request<API1.LoginResult>('http://127.0.0.1:9000/manage/devicegroup/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cms-token': token
        },
        data: body,
        ...(options || {}),
    });
}
