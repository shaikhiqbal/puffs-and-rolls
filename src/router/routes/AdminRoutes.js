import { lazy } from "react";

const VendorManagement = lazy(() => import("../../views/pages/vendor-management")
);
const DashboardEcommerce = lazy(() => import("../../views/dashboard/ecommerce")
);

const DashboardRoutes = [
  {
    path: "/admin/vendor",
    element: <VendorManagement />
  },
  {
    path: "/dashboard/ecommerce",
    element: <DashboardEcommerce />
  }
];

export default DashboardRoutes;
