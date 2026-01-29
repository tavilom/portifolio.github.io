import React from "react";
import MainLayout from "@/modules/main/layouts/MainLayout";

// Importação dinâmica para carregamento sob demanda (lazy loading)
const HomePage = React.lazy(() => import("@/modules/main/MainPage"));
const ProjetoPage = React.lazy(() => import("@/modules/main/pages/ProjetoPage"));
const CodigoPage = React.lazy(() => import("@/modules/main/pages/CodigoPage"));
const ContatoPage = React.lazy(() => import("@/modules/main/pages/ContatoPage"))



export const HomeRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> }, // rota inicial dentro do layout
      { path: "projetos", element: <ProjetoPage /> },
      { path: "codigos", element: <CodigoPage /> },
      { path: "contato", element: <ContatoPage /> },
      // outras rotas filhas...
    ],
  },
];
