import Pipeline from 'features/Pipeline'
import Dashboard from "features/dashboard/dashboardContainer"
import Employee from "features/employee/employeeContainer"
import Clients from "features/client/clientContainer"
import Service from "features/service/serviceContainer"
import Company from "features/company/companyContainer"

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
  },
  {
    path: "/clients",
    exact: true,
    component: Clients
  },
  {
    path: "/service",
    exact: true,
    component: Service
  },
  {
    path: "/company",
    exact: true,
    component: Company
  }

]