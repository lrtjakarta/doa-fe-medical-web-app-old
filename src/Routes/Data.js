import {
  HomePages,
  Form,
  Hasil,
  Scan,
  History,
  Monthly,
  Dashboard,
} from "../Pages/index";

const dataRouters = [
  {
    id: 1,
    name: "Beranda",
    path: "/app/medical",
    page: HomePages,
  },
  {
    id: 2,
    name: "Form",
    path: "/app/medical/form",
    page: Form,
  },
  {
    id: 4,
    name: "Hasil",
    path: "/app/medical/result",
    page: Hasil,
  },
  {
    id: 5,
    name: "Scan",
    path: "/app/medical/scan",
    page: Scan,
  },
  {
    id: 6,
    name: "Laporan Bulanan",
    path: "/app/medical/history",
    page: History,
  },
  {
    id: 7,
    name: "Laporan Bulanan",
    path: "/app/medical/monthly",
    page: Monthly,
  },
  {
    id: 8,
    name: "Dashboard",
    path: "/app/medical/dashboard",
    page: Dashboard,
  },
];

export { dataRouters };
