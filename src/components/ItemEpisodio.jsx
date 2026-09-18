import { LuCalendarDays, LuCheck, LuClock, LuPlus } from "react-icons/lu";

import { formatarData, formatarDuracao } from "../dados/formatacao.js";

const ItemEpisodio = ({ episodio, assistido, aoAlternar }) => {
  return (
    <li className={assistido ? "episodio episodio--assistido" : "episodio"}>
      <div className="episodio__numero">
        T{episodio.season_number}E{episodio.episode_number}
      </div>

      <div className="episodio__conteudo">
        <h3 className="episodio__titulo">{episodio.name}</h3>

        {episodio.overview && (
          <p className="episodio__sinopse">{episodio.overview}</p>
        )}

        <div className="episodio__meta">
          <span>
            <LuCalendarDays size={13} /> {formatarData(episodio.air_date)}
          </span>
          <span>
            <LuClock size={13} /> {formatarDuracao(episodio.runtime)}
          </span>
        </div>
      </div>

      <button
        type="button"
        className={
          assistido
            ? "botao botao--pequeno"
            : "botao botao--secundario botao--pequeno"
        }
        onClick={() => aoAlternar(episodio)}
        aria-pressed={assistido}
      >
        {assistido ? <LuCheck size={15} /> : <LuPlus size={15} />}
        {assistido ? "Assistido" : "Marcar"}
      </button>
    </li>
  );
};

export default ItemEpisodio;
