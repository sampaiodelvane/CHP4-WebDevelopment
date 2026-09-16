import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import Cabecalho from "../components/Cabecalho.jsx";
import Rodape from "../components/Rodape.jsx";
import { ContextoApp } from "../contexto/contextos.js";
import { contarSeriesAcompanhadas } from "../dados/armazenamento.js";

const LayoutPrincipal = () => {
  const [quantidadeSeries, setQuantidadeSeries] = useState(0);

  const recarregarQuantidade = () => {
    setQuantidadeSeries(contarSeriesAcompanhadas());
  };

  useEffect(() => {
    setQuantidadeSeries(contarSeriesAcompanhadas());
  }, []);

  return (
    <ContextoApp.Provider value={{ quantidadeSeries, recarregarQuantidade }}>
      <div className="app">
        <Cabecalho quantidadeAcompanhando={quantidadeSeries} />
        <Outlet />
        <Rodape />
      </div>
    </ContextoApp.Provider>
  );
};

export default LayoutPrincipal;
