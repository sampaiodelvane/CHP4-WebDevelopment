import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LuSearchX, LuSearch } from "react-icons/lu";

import CampoBusca from "../components/CampoBusca.jsx";
import Carregando from "../components/Carregando.jsx";
import EstadoVazio from "../components/EstadoVazio.jsx";
import GradeSeries from "../components/GradeSeries.jsx";
import MensagemErro from "../components/MensagemErro.jsx";
import { buscarSeriesPorTermo } from "../servicos/tmdb.js";

const Busca = () => {
  const { termo } = useParams();
  const termoBuscado = termo ? decodeURIComponent(termo) : "";

  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (termoBuscado === "") {
      setResultados([]);
      return;
    }

    const carregarResultados = async () => {
      setCarregando(true);
      setErro("");

      try {
        const resposta = await buscarSeriesPorTermo(termoBuscado);
        setResultados(resposta.results);
      } catch (problema) {
        setErro(problema.message);
      }

      setCarregando(false);
    };

    carregarResultados();
  }, [termoBuscado]);

  return (
    <main className="conteudo">
      <section className="secao">
        <div className="secao__titulo">
          <h2>Busca</h2>
          {termoBuscado && <span>Resultados para &ldquo;{termoBuscado}&rdquo;</span>}
        </div>

        <CampoBusca valorInicial={termoBuscado} />
      </section>

      <section className="secao">
        {erro && <MensagemErro mensagem={erro} />}

        {carregando && !erro && (
          <Carregando esqueleto texto="Buscando séries..." />
        )}

        {!carregando && !erro && resultados.length > 0 && (
          <GradeSeries series={resultados} />
        )}

        {!carregando && !erro && termoBuscado && resultados.length === 0 && (
          <EstadoVazio
            icone={LuSearchX}
            titulo="Nenhuma série encontrada"
            descricao="Revise a grafia ou tente buscar pelo título original em inglês."
          />
        )}

        {!carregando && !erro && !termoBuscado && (
          <EstadoVazio
            icone={LuSearch}
            titulo="O que você quer assistir?"
            descricao="Digite o nome de uma série no campo acima para começar."
          />
        )}
      </section>
    </main>
  );
};

export default Busca;
