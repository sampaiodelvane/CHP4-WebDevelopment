import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CheckCheck, RotateCcw } from "lucide-react";

import BarraProgresso from "../components/BarraProgresso.jsx";
import Carregando from "../components/Carregando.jsx";
import ItemEpisodio from "../components/ItemEpisodio.jsx";
import MensagemErro from "../components/MensagemErro.jsx";
import { ContextoSerie } from "../contexto/contextos.js";
import { buscarTemporada } from "../servicos/tmdb.js";
import { montarChaveEpisodio } from "../dados/armazenamento.js";

const Temporada = () => {
  const { idSerie, numeroTemporada } = useParams();
  const { assistidos, aoAlternarEpisodio, aoMarcarTemporada } =
    useContext(ContextoSerie);

  const [temporada, setTemporada] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const carregarTemporada = async () => {
      setCarregando(true);
      setErro("");

      try {
        const dados = await buscarTemporada(idSerie, numeroTemporada);
        setTemporada(dados);
      } catch (problema) {
        setErro(problema.message);
      }

      setCarregando(false);
    };

    carregarTemporada();
  }, [idSerie, numeroTemporada, tentativa]);

  if (carregando) {
    return <Carregando texto="Carregando episódios..." />;
  }

  if (erro) {
    return (
      <MensagemErro
        mensagem={erro}
        aoTentarNovamente={() => setTentativa(tentativa + 1)}
      />
    );
  }

  const episodios = temporada.episodes;

  const marcados = episodios.filter((episodio) =>
    Boolean(
      assistidos[
        montarChaveEpisodio(
          idSerie,
          episodio.season_number,
          episodio.episode_number
        )
      ]
    )
  ).length;

  const temporadaCompleta =
    episodios.length > 0 && marcados === episodios.length;

  return (
    <section className="secao">
      <div className="secao__titulo">
        <h2>{temporada.name}</h2>
        <span>
          {episodios.length} {episodios.length === 1 ? "episódio" : "episódios"}
        </span>
      </div>

      <BarraProgresso assistidos={marcados} total={episodios.length} />

      <div className="acoes acoes--temporada">
        <button
          type="button"
          className="botao botao--secundario"
          onClick={() => aoMarcarTemporada(episodios, true)}
          disabled={temporadaCompleta}
        >
          <CheckCheck size={16} />
          Marcar temporada inteira
        </button>

        <button
          type="button"
          className="botao botao--secundario"
          onClick={() => aoMarcarTemporada(episodios, false)}
          disabled={marcados === 0}
        >
          <RotateCcw size={16} />
          Desmarcar temporada
        </button>
      </div>

      <ul className="episodios">
        {episodios.map((episodio) => (
          <ItemEpisodio
            key={episodio.id}
            episodio={episodio}
            assistido={Boolean(
              assistidos[
                montarChaveEpisodio(
                  idSerie,
                  episodio.season_number,
                  episodio.episode_number
                )
              ]
            )}
            aoAlternar={aoAlternarEpisodio}
          />
        ))}
      </ul>
    </section>
  );
};

export default Temporada;
