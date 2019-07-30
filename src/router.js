import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// const compose = {
//   path: 'compose',
//   component: MessageComposer,
// };
//
// const view = {
//   path: 'view/:id',
//   component: MessageReader,
// };
//
// const inbox = {
//   path: '/inbox',
//   name: 'inbox',
//   component: Mailbox,
//   children: [compose, view],
// };
//
// const outbox = {
//   path: '/outbox',
//   name: 'outbox',
//   component: Mailbox,
//   children: [compose, view]
// };

const base = {
  path: '/',
  redirect: '/inbox',
};

const routes = [ base /*, inbox, outbox*/ ];

export default new Router({mode: 'history', base: process.env.BASE_URL, routes,})
