import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./components/SplashScreen";
import { LoginScreen } from "./components/LoginScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { UploadBillScreen } from "./components/UploadBillScreen";
import { EmissionCalculationScreen } from "./components/EmissionCalculationScreen";
import { ReportGenerationScreen } from "./components/ReportGenerationScreen";
import { SettingsScreen } from "./components/SettingsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/dashboard",
    Component: DashboardScreen,
  },
  {
    path: "/upload",
    Component: UploadBillScreen,
  },
  {
    path: "/calculation",
    Component: EmissionCalculationScreen,
  },
  {
    path: "/report",
    Component: ReportGenerationScreen,
  },
  {
    path: "/settings",
    Component: SettingsScreen,
  },
]);