export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'user',
                routes: [
                  {
                    name: 'staffs',
                    path: '/admin/staffs',
                    component: './admin/staffs/List',
                  },
                  {
                    name: 'roles',
                    path: '/admin/roles',
                    component: './admin/roles/List',
                  },
                  {
                    name: 'accesss',
                    path: '/admin/accesss',
                    component: './admin/accesss/List',
                  },
                  {
                    path: '/admin/exception',
                    routes:[
                      {
                        path: '/admin/exception/403',
                        component: './exceptions/403',
                      },
                      {
                        path: '/admin/exception/404',
                        component: './exceptions/404',
                      },
                      {
                        path: '/admin/exception/500',
                        component: './exceptions/500',
                      },
                    ]
                  },

                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
