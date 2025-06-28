import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Component/Home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayouts />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
])