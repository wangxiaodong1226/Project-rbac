// @ts-nocheck
import { plugin } from './plugin';
import * as Plugin_0 from 'D:/rbac/rbac-admin/node_modules/umi-plugin-antd-icon-config/lib/app.js';
import * as Plugin_1 from 'D:/rbac/rbac-admin/src/.umi/plugin-dva/runtime.tsx';
import * as Plugin_2 from '../plugin-initial-state/runtime';
import * as Plugin_3 from 'D:/rbac/rbac-admin/src/.umi/plugin-locale/runtime.tsx';
import * as Plugin_4 from '../plugin-model/runtime';

  plugin.register({
    apply: Plugin_0,
    path: 'D:/rbac/rbac-admin/node_modules/umi-plugin-antd-icon-config/lib/app.js',
  });
  plugin.register({
    apply: Plugin_1,
    path: 'D:/rbac/rbac-admin/src/.umi/plugin-dva/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_2,
    path: '../plugin-initial-state/runtime',
  });
  plugin.register({
    apply: Plugin_3,
    path: 'D:/rbac/rbac-admin/src/.umi/plugin-locale/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_4,
    path: '../plugin-model/runtime',
  });
