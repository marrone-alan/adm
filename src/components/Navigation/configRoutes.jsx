import React from 'react';

import Icon from '@mdi/react';
import {
  mdiAccountGroup,
  mdiBookLock,
  mdiLaptop,
  mdiClipboardFlow,
  mdiStore,
  mdiFileChart,
} from '@mdi/js';

/* route config
 * {string} desc: text to show in the anchor tag
 * {string} path: url path
 * {array} profile: acl to show the nav link
 * {component} icon: mdi icon
 * {array} childRoutes: sub menu
 */
const routes = [
  {
    desc: 'Usuários',
    path: '/usuarios',
    profiles: [1],
    icon: <Icon path={mdiAccountGroup} size={1} color="#4c4848" />,
  },
  {
    desc: 'Acl',
    path: '/acl',
    profiles: [1],
    icon: <Icon path={mdiBookLock} size={1} color="#4c4848" />,
  },
  {
    desc: 'Recursos',
    path: '#',
    profiles: [1],
    icon: <Icon path={mdiLaptop} size={1} color="#4c4848" />,
    childRoutes: [
      {
        desc: 'Ações',
        path: '/recursos/acoes',
        profiles: [1],
      },
      {
        desc: 'Sistemas',
        path: '/recursos/sistemas',
        profiles: [1],
      },
    ],
  },
  {
    desc: 'Status',
    path: '#',
    profiles: [1],
    icon: <Icon path={mdiClipboardFlow} size={1} color="#4c4848" />,
    childRoutes: [
      {
        desc: 'Pedido',
        path: '/status/pedido',
        profiles: [1],
      },
      {
        desc: 'Produto',
        path: '/status/produto',
        profiles: [1],
      },
    ],
  },
  {
    desc: 'IP',
    path: '/ip',
    profiles: [1],
    icon: <Icon path={mdiStore} size={1} color="#4c4848" />,
  },
  {
    desc: 'Relatórios',
    path: '#',
    profiles: [1],
    icon: <Icon path={mdiFileChart} size={1} color="#4c4848" />,
    childRoutes: [
      {
        desc: 'Acessos',
        path: '/relatorios/acessos',
        profiles: [1],
      },
      {
        desc: 'Operacional',
        path: '/relatorios/operacional',
        profiles: [1],
      },
    ],
  },
];

export default routes;
