import Vue from 'vue';
import Router from 'vue-router';
import Note from '@/components/note';
import Person from '@/components/person';
import New from '@/components/new';
import All from '@/components/all';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: Note,
      redirect: '/note/new',
    }, {
      path: '/note',
      name: 'Note',
      component: Note,
      redirect: '/note/new',
      children: [
        { path: 'new', name: 'new', component: New },
        { path: 'all', name: 'all', component: All },
        { path: 'detail/:noteId', name: 'detail', component: All },
      ],
    }, {
      path: '/person',
      name: 'Person',
      component: Person,
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
