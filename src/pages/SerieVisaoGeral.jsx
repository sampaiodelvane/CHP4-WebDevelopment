import { useContext } from "react";
import { Link } from "react-router";

import BarraProgresso from "../components/BarraProgresso.jsx";
import { ContextoSerie } from "../contexto/contextos.js";
import { montarChaveEpisodio } from "../dados/armazenamento.js";

/* Conta quantos episódios de uma temporada já foram marcados. */
const contarNaTemporada = (idSerie, temporada, assistidos) =>
  Object.values(assistidos).filter(
    (item) =>
      Number(item.idSerie) === Number(idSerie) &&
      item.temporada === temporada.season_number
  ).length;

const encontrarProximo = (serie, temporadas, assistidos) => {
  for (let i = 0; i < temporadas.length; i = i + 1) {
    const temporada = temporadas[i];

    for (let numero = 1; numero <= temporada.episode_count; numero = numero + 1) {
      const chave = montarChaveEpisodio(
        serie.id,
        temporada.season_number,
        numero
      );

      if (!assistidos[chave]) {
        return { temporada: temporada.season_number, episodio: numero };
      }
    }
  }

  return null;
};

const SerieVisaoGeral = () => {
  const { serie, temporadas, assistidos, totalAssistidos } =
    useContext(ContextoSerie);

  const proximo = encontrarProximo(serie, temporadas, assistidos);

  return (
    <>
      <section className="secao">
        <div className="secao__titulo">
          <h2>Sinopse</h2>
        </div>
        <p>
          {serie.overview ||
            "Esta série ainda não tem sinopse em português no TMDB."}
        </p>
      </section>

      <section className="secao">
        <div className="secao__titulo">
          <h2>Onde você parou</h2>
          <span>{totalAssistidos} episódios marcados</span>
        </div>

        {proximo ? (
          <div className="aviso">
            <div>
              <p>
                Seu próximo episódio é o{" "}
                <strong>
                  T{proximo.temporada}E{proximo.episodio}
                </strong>
                .
              </p>
              <Link
                className="botao botao--pequeno botao--espacado"
                to={`/series/${serie.id}/temporada/${proximo.temporada}`}
              >
                Ir para a temporada {proximo.temporada}
              </Link>
            </div>
          </div>
        ) : (
          <div className="aviso">
            <p>Você já marcou todos os episódios desta série.</p>
          </div>
        )}
      </section>

      <section className="secao">
        <div className="secao__titulo">
          <h2>Temporadas</h2>
          <span>{temporadas.length} no total</span>
        </div>

        <ul className="episodios">
          {temporadas.map((temporada) => (
            <li className="episodio" key={temporada.id}>
              <div className="episodio__conteudo">
                <h3 className="episodio__titulo">
                  <Link
                    to={`/series/${serie.id}/temporada/${temporada.season_number}`}
                  >
                    Temporada {temporada.season_number}
                  </Link>
                </h3>

                <BarraProgresso
                  assistidos={contarNaTemporada(serie.id, temporada, assistidos)}
                  total={temporada.episode_count}
                />
              </div>

              <Link
                className="botao botao--secundario botao--pequeno"
                to={`/series/${serie.id}/temporada/${temporada.season_number}`}
              >
                Abrir
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SerieVisaoGeral;
