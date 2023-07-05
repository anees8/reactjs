import { USERS_ROUTE,LOGIN_ROUTE,PRODUCTS_ROUTE,EMPLOYEES_ROUTE,CUSTOM404_ROUTE } from "../config/constant/routerpathContant";
import LOGINPAGE from "../components/Login/index";
import USERSPAGE from "../components/Users/index";
import PRODUCTSPAGE from "../components/Product/index";
import EMPLOYEESPAGE from "../components/Employee/index";
import CUSTOM404PAGE from "../components/Common/Custom404";

const VISITER_ROUTES=[
{path:LOGIN_ROUTE,Component:LOGINPAGE},
{path:USERS_ROUTE,Component:USERSPAGE},
{path:PRODUCTS_ROUTE,Component:PRODUCTSPAGE},
{path:EMPLOYEES_ROUTE,Component:EMPLOYEESPAGE},
{path:CUSTOM404_ROUTE,Component:CUSTOM404PAGE},
];

export default VISITER_ROUTES;