import Pipeline from 'features/Pipeline';
import Contacts from 'features/contacts/containers/list';
import Dashboard from "features/dashboard/dashboardContainer";
import Clients from "features/client/clientContainer"

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
  },
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard
  },
  {
    path: "/clients",
    exact: true,
    component: Clients
  }

]