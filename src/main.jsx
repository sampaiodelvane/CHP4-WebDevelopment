import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import LayoutPrincipal from "./pages/LayoutPrincipal.jsx";
import LayoutSerie from "./pages/LayoutSerie.jsx";
import Inicio from "./pages/Inicio.jsx";
import Busca from "./pages/Busca.jsx";
import MinhaLista from "./pages/MinhaLista.jsx";
import Estatisticas from "./pages/Estatisticas.jsx";
import SerieVisaoGeral from "./pages/SerieVisaoGeral.jsx";
import Temporada from "./pages/Temporada.jsx";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPrincipal />,
    errorElement: <PaginaNaoEncontrada />,
    children: [
      { index: true, element: <Inicio /> },
      { path: "busca", element: <Busca /> },
      { path: "busca/:termo", element: <Busca /> },
      { path: "minha-lista", element: <MinhaLista /> },
      { path: "estatisticas", element: <Estatisticas /> },
      {
        path: "series/:idSerie",
        element: <LayoutSerie />,
        children: [
          { index: true, element: <SerieVisaoGeral /> },
          { path: "temporada/:numeroTemporada", element: <Temporada /> },
        ],
      },
      { path: "*", element: <PaginaNaoEncontrada /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
