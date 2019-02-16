import Pipeline from 'features/Pipeline';
import Dashboard from "features/dashboard/dashboardContainer";
import Employee from "features/employee/employeeContainer";

export const routes = [
  {
    path: '/notafiscal',
    exact: true,
    component: Pipeline
  },
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard
  },
  {
    path: "/employee",
    exact: true,
    component: Employee

  }

]