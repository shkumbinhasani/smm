import {createBrowserRouter} from "react-router-dom";
import Root from "../Layouts/Root";
import LoginPage from "../pages/Login/LoginPage";

const publicRouter = createBrowserRouter([
    {
        element: <Root />,
        path: "/",
    },
    {
        element: <LoginPage />,
        path: "login"
    }
]);

export default publicRouter
