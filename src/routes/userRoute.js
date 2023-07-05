import { USERS_ROUTE,LOGIN_ROUTE,PRODUCTS_ROUTE,EMPLOYEES_ROUTE } from "../config/constant/routerpathContant";
import LOGINPAGE from "../components/Login/index";
import USERSPAGE from "../components/Users/index";
import PRODUCTSPAGE from "../components/Product/index";
import EMPLOYEESPAGE from "../components/Employee/index";

const VISITER_ROUTES=[
{path:LOGIN_ROUTE,Component:LOGINPAGE},
{path:USERS_ROUTE,Component:USERSPAGE},
{path:PRODUCTS_ROUTE,Component:PRODUCTSPAGE},
{path:EMPLOYEES_ROUTE,Component:EMPLOYEESPAGE},
];

export default VISITER_ROUTES;