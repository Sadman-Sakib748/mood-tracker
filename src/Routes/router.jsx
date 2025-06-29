import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Component/Home/Home";
import WeeklyChart from "../Component/Page/WeeklyChart/WeeklyChart";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayouts />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "chart",
                element: <WeeklyChart userId="01703174167" />,
            },

        ]
    }
])