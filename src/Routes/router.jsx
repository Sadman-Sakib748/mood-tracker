import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Component/Home/Home";
import WeeklyChart from "../Component/Page/WeeklyChart/WeeklyChart";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import MoodPage from "../Component/Page/MoodPage/MoodPage";
import MoodManager from "../Component/MoodManager/MoodManager";
import Update from "../Component/Page/Update/Update";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayouts />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "mood",
                element: <MoodPage />
            },
            {
                path: "open",
                element: <MoodManager />
            },
            {
                path: "update/:id",
                element: <Update />
            }


        ]
    }
])