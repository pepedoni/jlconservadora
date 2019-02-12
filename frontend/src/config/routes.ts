import Pipeline from 'features/Pipeline';
import Contacts from 'features/contacts/containers/list';

export const routes = [
  {
    path: '/notafiscal',
    exact: true,
    component: Pipeline
  },
  {
    path: '/contacts',
    exact: true,
    component: Contacts
  }

]