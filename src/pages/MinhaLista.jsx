import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { Compass, ListVideo, Trash2 } from "lucide-react";

import CardSerie from "../components/CardSerie.jsx";
import EstadoVazio from "../components/EstadoVazio.jsx";
import { ContextoApp } from "../contexto/contextos.js";
import {
  lerEpisodiosAssistidos,
  lerSeriesAcompanhadas,
  pararDeAcompanhar,
} from "../dados/armazenamento.js";

const montarResumo = (series, assistidos) => {
  const episodios = Object.values(assistidos);

  const itens = Object.values(series).map((serie) => {
    const daSerie = episodios.filter(
      (item) => Number(item.idSerie) === Number(serie.id)
    );

    const ordenados = daSerie
      .slice()
      .sort((a, b) => a.assistidoEm.localeCompare(b.assistidoEm));

    return {
      serie,
      assistidos: daSerie.length,
      total: serie.totalEpisodios,
      ultimo: ordenados.length > 0 ? ordenados[ordenados.length - 1] : null,
    };
  });

  return itens.sort((a, b) => {
    const dataA = a.ultimo ? a.ultimo.assistidoEm : a.serie.adicionadaEm;
    const dataB = b.ultimo ? b.ultimo.assistidoEm : b.serie.adicionadaEm;
    return dataB.localeCompare(dataA);
  });
};

/* Página "Minha lista": as séries acompanhadas, ordenadas pela atividade
   mais recente. */
const MinhaLista = () => {
  const { recarregarQuantidade } = useContext(ContextoApp);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    setItens(montarResumo(lerSeriesAcompanhadas(), lerEpisodiosAssistidos()));
  }, []);

  const aoRemover = (idSerie) => {
    const series = pararDeAcompanhar(idSerie);
    setItens(montarResumo(series, lerEpisodiosAssistidos()));
    recarregarQuantidade();
  };

  if (itens.length === 0) {
    return (
      <main className="conteudo">
        <section className="secao">
          <div className="secao__titulo">
            <h2>Minha lista</h2>
          </div>

          <EstadoVazio
            icone={ListVideo}
            titulo="Sua lista ainda está vazia"
            descricao="Acompanhe uma série ou marque um episódio para ela aparecer aqui."
          >
            <Link to="/" className="botao">
              <Compass size={16} />
              Descobrir séries
            </Link>
          </EstadoVazio>
        </section>
      </main>
    );
  }

  return (
    <main className="conteudo">
      <section className="secao">
        <div className="secao__titulo">
          <h2>Minha lista</h2>
          <span>
            {itens.length} {itens.length === 1 ? "série" : "séries"}
          </span>
        </div>

        <div className="grade">
          {itens.map((item) => (
            <div className="item-lista" key={item.serie.id}>
              <CardSerie
                serie={item.serie}
                progresso={{ assistidos: item.assistidos, total: item.total }}
              />

              {item.ultimo ? (
                <Link
                  className="botao botao--secundario botao--pequeno"
                  to={`/series/${item.serie.id}/temporada/${item.ultimo.temporada}`}
                >
                  Retomar em T{item.ultimo.temporada}E{item.ultimo.episodio}
                </Link>
              ) : (
                <Link
                  className="botao botao--secundario botao--pequeno"
                  to={`/series/${item.serie.id}/temporada/1`}
                >
                  Começar pela temporada 1
                </Link>
              )}

              <button
                type="button"
                className="botao botao--perigo botao--pequeno"
                onClick={() => aoRemover(item.serie.id)}
              >
                <Trash2 size={14} />
                Remover
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MinhaLista;
