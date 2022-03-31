/*
 * @Author: L.柠
 * @Date: 2022-03-24 13:43:33
 */

import { PlusOutlined } from "@ant-design/icons";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, message } from "antd";
import { useRef, useState } from "react";
import request from 'umi-request';
import { devicesDle, devicesEdit } from '../../services/devices/api'
function DevicesGroup() {
    const actionRef = useRef<ActionType>();
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

    type GithubIssueItem = {
        id: number,
        errCode: number;
        message: string;
        data: {
            id: number,
            name: string;
            beizhu: string;
            belong: string;
            status: number;
            create_time: string;
            update_time: string
        }[];


    };

    const waitTime = (time: number = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };
    const device_edit = async (body: Devices.Group, name: string, status: number, beizhu: string) => {
        const token = localStorage.getItem('cms-token')
        const msg = await devicesEdit({ ...body, name, status, beizhu }, '', token)
        message.success(msg['message'], 1)
    }
    const device_delete = async (body: Devices.Group, name: string) => {
        const token = localStorage.getItem('cms-token')
        const msg = await devicesDle({ ...body, name }, '', token)
        message.success(msg['message'], 1)
    }


    const columns: ProColumns<GithubIssueItem>[] = [
        {
            title: '序号',
            dataIndex: 'id',
            valueType: 'indexBorder',
            hideInSearch: true,
            width: 48,
            editable: false,
        },
        {
            title: '组名',
            dataIndex: 'name',
            ellipsis: true,
            tip: '标题过长会自动收缩',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
        },
        {
            title: '状态',
            dataIndex: 'status',
            filters: true,
            onFilter: true,
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '启用',
                    status: 'Success',
                },
                1: {
                    text: '禁用',
                    status: 'error',

                },

            },
            order: 1
        },
        {
            title: '备注',
            dataIndex: 'beizhu',
            search: false,
        },
        {
            title: '所属',
            dataIndex: 'belong',
            search: false,
        },
        {
            title: '创建时间',
            key: 'showTime',
            dataIndex: 'create_time',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
            editable: false
        },

        {
            title: '更新时间',
            key: 'update_time',
            dataIndex: 'update_time',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
            editable: false
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id)
                    }}
                >
                    编辑
                </a>,
            ],
        },
    ];
    return (
        <div>
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params = {},) => {
                    return request<{
                        data: GithubIssueItem[];
                    }>('http://127.0.0.1:9000/manage/devicegroup', {
                        params,
                    });
                }}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                        let name = data['name']
                        let status = data['status']
                        let beizhu = data['beizhu']
                        await device_edit({}, name, status, beizhu)
                        await waitTime(1000);
                    },
                    onChange: setEditableRowKeys,
                    onDelete: async (rowKey, data) => {
                        let name = data['name']
                        await device_delete({}, name)
                        await waitTime(500);
                    }
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                }}
                rowKey="id"
                search={false}
                form={{
                    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        if (type === 'get') {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                pagination={{
                    pageSize: 15,

                }}
                dateFormatter="string"
                headerTitle="设备分组"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary">
                        新建
                    </Button>,

                ]}
            />
        </div>
    )
}

export default DevicesGroup


