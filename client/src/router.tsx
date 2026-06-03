import { createBrowserRouter } from "react-router";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
import { HomeView } from "./views/HomeView";
import Root from "./views/Root";

export const router = createBrowserRouter([
    {
  path: "/",
  Component: Root,
  children: [
    {
      index: true,
      Component: HomeView
    },
    {
      path: "/auth/login",
      Component: LoginView
    },
    {
      path: "/auth/register",
      Component: RegisterView
    }
  ]
}
])
