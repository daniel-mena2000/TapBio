import { createBrowserRouter } from "react-router";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
import { HomeView } from "./views/HomeView";
import AuthLayout from "./Layout/AuthLayout";
import AppLayout from "./Layout/AppLayout";
import { LinkTapBioView } from "./views/LinkTapBioView";
import { ProfileView } from "./views/ProfileView";
export const router = createBrowserRouter([
    {
  path: "/",
  Component: AuthLayout,
  children: [
    {
      index: true,
      Component: HomeView
    },
    {
      path: "auth/login",
      Component: LoginView
    },
    {
      path: "auth/register",
      Component: RegisterView
    }
  ]
},
 {
    path: "/admin",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: LinkTapBioView
      },
      {
      path: "profile",
      Component: ProfileView
    }
    ]
  }

])
