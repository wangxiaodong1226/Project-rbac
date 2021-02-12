// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'D:/rbac/rbac-admin/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'D:/rbac/rbac-admin/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'D:/rbac/rbac-admin/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login' */'D:/rbac/rbac-admin/src/pages/User/login'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'D:/rbac/rbac-admin/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'D:/rbac/rbac-admin/src/layouts/BasicLayout'), loading: LoadingComponent}),
            "authority": [
              "admin",
              "user"
            ],
            "routes": [
              {
                "path": "/",
                "redirect": "/welcome",
                "exact": true
              },
              {
                "path": "/welcome",
                "name": "welcome",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'D:/rbac/rbac-admin/src/pages/Welcome'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/admin",
                "name": "admin",
                "icon": "user",
                "routes": [
                  {
                    "name": "staffs",
                    "path": "/admin/staffs",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__admin__staffs__List' */'D:/rbac/rbac-admin/src/pages/admin/staffs/List'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "roles",
                    "path": "/admin/roles",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__admin__roles__List' */'D:/rbac/rbac-admin/src/pages/admin/roles/List'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "accesss",
                    "path": "/admin/accesss",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__admin__accesss__List' */'D:/rbac/rbac-admin/src/pages/admin/accesss/List'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/admin/exception",
                    "routes": [
                      {
                        "path": "/admin/exception/403",
                        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exceptions__403' */'D:/rbac/rbac-admin/src/pages/exceptions/403'), loading: LoadingComponent}),
                        "exact": true
                      },
                      {
                        "path": "/admin/exception/404",
                        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exceptions__404' */'D:/rbac/rbac-admin/src/pages/exceptions/404'), loading: LoadingComponent}),
                        "exact": true
                      },
                      {
                        "path": "/admin/exception/500",
                        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exceptions__500' */'D:/rbac/rbac-admin/src/pages/exceptions/500'), loading: LoadingComponent}),
                        "exact": true
                      }
                    ]
                  }
                ]
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/rbac/rbac-admin/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/rbac/rbac-admin/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/rbac/rbac-admin/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
