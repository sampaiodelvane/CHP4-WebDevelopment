import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import { BookmarkCheck, BookmarkPlus, ImageOff, Star } from "lucide-react";

import BarraProgresso from "../components/BarraProgresso.jsx";
import Carregando from "../components/Carregando.jsx";
import MensagemErro from "../components/MensagemErro.jsx";
import { ContextoApp, ContextoSerie } from "../contexto/contextos.js";
import { buscarSerie, montarUrlImagem } from "../servicos/tmdb.js";
import { formatarAno, formatarNota } from "../dados/formatacao.js";
import {
  acompanharSerie,
  alternarEpisodio,
  contarEpisodiosDaSerie,
  estaAcompanhando,
  lerEpisodiosAssistidos,
  marcarTemporadaInteira,
  pararDeAcompanhar,
} from "../dados/armazenamento.js";

const LayoutSerie = () => {
  const { idSerie, numeroTemporada } = useParams();
  const { recarregarQuantidade } = useContext(ContextoApp);

  const [serie, setSerie] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [acompanhando, setAcompanhando] = useState(false);
  const [assistidos, setAssistidos] = useState({});
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const carregarSerie = async () => {
      setCarregando(true);
      setErro("");

      try {
        const dados = await buscarSerie(idSerie);
        setSerie(dados);
      } catch (problema) {
        setErro(problema.message);
      }

      setCarregando(false);
    };

    carregarSerie();
  }, [idSerie, tentativa]);

  useEffect(() => {
    setAcompanhando(estaAcompanhando(idSerie));
    setAssistidos(lerEpisodiosAssistidos());
  }, [idSerie]);

  const aoAlternarAcompanhamento = () => {
    if (acompanhando) {
      pararDeAcompanhar(idSerie);
      setAcompanhando(false);
    } else {
      acompanharSerie(serie);
      setAcompanhando(true);
    }

    recarregarQuantidade();
  };

  const aoAlternarEpisodio = (episodio) => {
    const atualizados = alternarEpisodio(idSerie, episodio);
    setAssistidos({ ...atualizados });

    if (!acompanhando) {
      acompanharSerie(serie);
      setAcompanhando(true);
      recarregarQuantidade();
    }
  };

  const aoMarcarTemporada = (episodios, marcar) => {
    const atualizados = marcarTemporadaInteira(idSerie, episodios, marcar);
    setAssistidos({ ...atualizados });

    if (marcar && !acompanhando) {
      acompanharSerie(serie);
      setAcompanhando(true);
      recarregarQuantidade();
    }
  };

  if (carregando) {
    return (
      <main className="conteudo">
        <Carregando texto="Carregando a série..." />
      </main>
    );
  }

  if (erro) {
    return (
      <main className="conteudo">
        <MensagemErro
          mensagem={erro}
          aoTentarNovamente={() => setTentativa(tentativa + 1)}
        />
      </main>
    );
  }

  const poster = montarUrlImagem(serie.poster_path);
  const temporadas = serie.seasons.filter(
    (temporada) => temporada.season_number > 0
  );
  const totalAssistidos = contarEpisodiosDaSerie(idSerie, assistidos);

  return (
    <ContextoSerie.Provider
      value={{
        serie,
        temporadas,
        assistidos,
        totalAssistidos,
        aoAlternarEpisodio,
        aoMarcarTemporada,
      }}
    >
      <section className="serie-capa">
        <div className="serie-capa__interno">
          {poster ? (
            <img
              className="serie-capa__poster"
              src={poster}
              alt={`Pôster de ${serie.name}`}
            />
          ) : (
            <div className="serie-capa__poster serie-capa__poster--vazio">
              <ImageOff size={26} />
            </div>
          )}

          <div className="serie-capa__texto">
            <h1>{serie.name}</h1>

            <div className="etiquetas">
              <span className="etiqueta">{formatarAno(serie.first_air_date)}</span>
              <span className="etiqueta">
                <Star size={12} /> {formatarNota(serie.vote_average)}
              </span>
              {serie.genres.slice(0, 3).map((genero) => (
                <span className="etiqueta" key={genero.id}>
                  {genero.name}
                </span>
              ))}
            </div>

            <BarraProgresso
              assistidos={totalAssistidos}
              total={serie.number_of_episodes}
            />

            <div className="acoes">
              <button
                type="button"
                className={acompanhando ? "botao botao--secundario" : "botao"}
                onClick={aoAlternarAcompanhamento}
              >
                {acompanhando ? (
                  <BookmarkCheck size={16} />
                ) : (
                  <BookmarkPlus size={16} />
                )}
                {acompanhando ? "Acompanhando" : "Acompanhar série"}
              </button>
            </div>
          </div>
        </div>

        <nav className="sub-navegacao" aria-label="Temporadas">
          <Link
            to={`/series/${idSerie}`}
            className={numeroTemporada ? "" : "ativo"}
          >
            Visão geral
          </Link>

          {temporadas.map((temporada) => (
            <Link
              key={temporada.id}
              to={`/series/${idSerie}/temporada/${temporada.season_number}`}
              className={
                Number(numeroTemporada) === temporada.season_number ? "ativo" : ""
              }
            >
              Temporada {temporada.season_number}
            </Link>
          ))}
        </nav>
      </section>

      <main className="conteudo">
        <Outlet />
      </main>
    </ContextoSerie.Provider>
  );
};

export default LayoutSerie;
