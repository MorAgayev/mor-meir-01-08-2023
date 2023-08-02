import {
    createBrowserRouter
  } from "react-router-dom";
import { Favorite } from "./pages/Favorite";
import { Weather } from "./pages/Weather";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Weather />
    },
    {
      path: "/favorite",
      element: <Favorite/>
    },
]);