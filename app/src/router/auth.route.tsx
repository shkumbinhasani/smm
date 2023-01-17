import {createBrowserRouter} from "react-router-dom";
import Root from "../Layouts/Root";

const authRouter = createBrowserRouter([
    {
        element: <Root />,
        path: "/",
    },
]);

export default authRouter
