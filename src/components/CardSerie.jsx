import { Link } from "react-router";
import { ImageOff, Star } from "lucide-react";

import BarraProgresso from "./BarraProgresso.jsx";
import { montarUrlImagem } from "../servicos/tmdb.js";
import { formatarAno, formatarNota } from "../dados/formatacao.js";



const CardSerie = ({ serie, progresso }) => {
  const poster = montarUrlImagem(serie.poster_path || serie.poster);
  const nome = serie.name || serie.nome;

  return (
    <Link to={`/series/${serie.id}`} className="card">
      {poster ? (
        <img
          className="card__poster"
          src={poster}
          alt={`Pôster de ${nome}`}
          loading="lazy"
        />
      ) : (
        <div className="card__poster card__poster--vazio">
          <ImageOff size={26} />
        </div>
      )}

      <div className="card__corpo">
        <h3 className="card__titulo">{nome}</h3>

        {progresso ? (
          <BarraProgresso
            assistidos={progresso.assistidos}
            total={progresso.total}
          />
        ) : (
          <div className="card__meta">
            <span>{formatarAno(serie.first_air_date)}</span>
            <span>
              <Star size={13} />
              {formatarNota(serie.vote_average)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CardSerie;
