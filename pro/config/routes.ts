/*
 * @Author: L.柠
 * @Date: 2022-03-12 15:19:50
 */
export default [
  {
    path: '/login',
    layout: false,
    component: './user/Login',
  },

  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'user-management',
    path: 'user',
    icon: 'team',
    routes: [
      {
        name: 'list',
        path: '/user/list',
        component: './UserList',
      },
    ]

  },
  {
    name: 'devices-management',
    path: 'devices',
    icon: 'android',
    routes: [
      {
        name: 'group',
        path: '/devices/group',
        component: './Devices/DevicesGroup.tsx',
      },
      {
        name: 'list',
        path: '/devices/list',
        component: './Devices/DevicesList.tsx',

      },

    ]

  },

  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/',
    redirect: '/login',
  },
  {
    component: './404',
  },
];
