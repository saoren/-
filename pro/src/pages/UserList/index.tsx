/*
 * @Author: L.柠
 * @Date: 2022-03-12 21:59:50
 */
import { Button, Form, Input, message, Modal, Select, Space, Switch, Table, Tag } from 'antd'
const { Option } = Select;
import { useEffect, useState } from 'react'
import { getuser, banUser, notBanUser, userEdit } from '../../services/user/api'
function UserList() {



    const [state, setstate] = useState([])
    const [username, setUsername] = useState('')
    const [authority, setAuthority] = useState('user')
    useEffect(() => {
        user()

        return () => {
            setstate([])

        }
    }, [])



    const user = async () => {

        const msg = await getuser()
        const { data } = msg
        setstate(data)
    }
    const ban = async (body: User.userban) => {
        const token = localStorage.getItem('cms-token')
        const msg = await banUser({ ...body, username }, '', token)
        message.success(msg['message'], 1)
    }
    const notBan = async (body: User.userban) => {
        const token = localStorage.getItem('cms-token')
        const msg = await notBanUser({ ...body, username }, '', token)
        message.success(msg['message'], 1)
    }
    const user_edit = async (body: User.user) => {
        const token = localStorage.getItem('cms-token')
        const msg = await userEdit({ ...body, username, authority }, '', token)
        message.success(msg['message'], 1)
    }

    const switchClick = (record: any, props: any) => {
        setUsername(record.username)
        if (props === true) {
            notBan({})
        } else {
            ban({})
        }
    }
    const editClick = (record: any, props: any) => {
        setIsModalVisible(true)
        setUsername(record.username)
    }


    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: '用户',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: '状态',
            key: 'isban',
            dataIndex: 'isban',
            render: (isban: string, record: any) => (
                <Switch onClick={(props) => switchClick(record, props)} checkedChildren="正常" unCheckedChildren="封号" defaultChecked={isban === '0'} />


            ),
        },
        {
            title: '权限',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: any) => (
                <>
                    {tags.map((tag: any) => {
                        let color = tag === 'super' ? 'geekblue' : tag === 'admin' ? 'green' : 'volcano';
                        tag === 'super' ? tag = '超级管理员' : tag === 'admin' ? tag = '管理员' : tag = '普通用户'

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (record: any) => (
                <Space>
                    <Button type='primary' onClick={(props) => editClick(record, props)}>编辑</Button>
                    <Button type='primary' onClick={(props) => { console.log('删除按钮') }} danger>删除</Button>
                </Space>
            ),
        },
    ];
    const data: any = []

    state.map((user) => {
        data.push(
            {
                key: user['id'],
                id: user['id'],
                username: user['username'],
                email: user['email'],
                avatar: user['avart'],
                isban: user['isban'],
                tags: [user['authority']],
            },
        )
    })




    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const [form] = Form.useForm();

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'super':
                //form.setFieldsValue({ username: 'Hi, man!' });
                setAuthority('super')
                return;
            case 'admin':
                //form.setFieldsValue({ username: 'Hi, lady!' });
                setAuthority('admin')
                return;
            case 'user':
                //form.setFieldsValue({ username: 'Hi there!' });
                setAuthority('user')
        }
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        user_edit({})
        setTimeout(() => {
            user()
            setIsModalVisible(false);
        }, 100);


    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div>

            <Table columns={columns} dataSource={data} />
            <Modal title="用户管理" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form style={{ marginLeft: '-60px', textAlign: 'center', width: '100%' }} {...layout} form={form} name="control-hooks" onFinish={onFinish} >
                    <Form.Item initialValue={username} name="username" label="用户名" rules={[{ required: true }]}>
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item name="gender" label='权限' rules={[{ required: true }]}>
                        <Select
                            onSelect={onGenderChange}
                            allowClear
                        >
                            <Option value="user">用户</Option>
                            <Option value="admin">管理员</Option>
                            <Option value="super">超级管理员</Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>

        </div>
    )
}

export default UserList