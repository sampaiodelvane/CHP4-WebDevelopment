const CHAVE_SERIES = "proximo:series";
const CHAVE_EPISODIOS = "proximo:episodios";

const ler = (chave) => {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : {};
  } catch (erro) {
    return {};
  }
};

const gravar = (chave, valor) => {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {

  }
};

export const montarChaveEpisodio = (idSerie, temporada, episodio) =>
  `${idSerie}-${temporada}-${episodio}`;

/* ---- Séries acompanhadas ---- */

export const lerSeriesAcompanhadas = () => ler(CHAVE_SERIES);

export const estaAcompanhando = (idSerie) =>
  Boolean(lerSeriesAcompanhadas()[idSerie]);

export const acompanharSerie = (serie) => {
  const series = lerSeriesAcompanhadas();

  series[serie.id] = {
    id: serie.id,
    nome: serie.name,
    poster: serie.poster_path,
    totalEpisodios: serie.number_of_episodes || 0,
    generos: serie.genres ? serie.genres.map((genero) => genero.name) : [],
    adicionadaEm: new Date().toISOString(),
  };

  gravar(CHAVE_SERIES, series);
  return series;
};

export const pararDeAcompanhar = (idSerie) => {
  const series = lerSeriesAcompanhadas();
  delete series[idSerie];
  gravar(CHAVE_SERIES, series);
  return series;
};

export const contarSeriesAcompanhadas = () =>
  Object.keys(lerSeriesAcompanhadas()).length;

/* ---- Episódios assistidos ---- */

export const lerEpisodiosAssistidos = () => ler(CHAVE_EPISODIOS);

const montarRegistro = (idSerie, episodio) => ({
  idSerie: Number(idSerie),
  temporada: episodio.season_number,
  episodio: episodio.episode_number,
  nome: episodio.name,
  duracao: episodio.runtime || 0,
  assistidoEm: new Date().toISOString(),
});

export const alternarEpisodio = (idSerie, episodio) => {
  const assistidos = lerEpisodiosAssistidos();
  const chave = montarChaveEpisodio(
    idSerie,
    episodio.season_number,
    episodio.episode_number
  );

  if (assistidos[chave]) {
    delete assistidos[chave];
  } else {
    assistidos[chave] = montarRegistro(idSerie, episodio);
  }

  gravar(CHAVE_EPISODIOS, assistidos);
  return assistidos;
};

export const marcarTemporadaInteira = (idSerie, episodios, marcar) => {
  const assistidos = lerEpisodiosAssistidos();

  episodios.forEach((episodio) => {
    const chave = montarChaveEpisodio(
      idSerie,
      episodio.season_number,
      episodio.episode_number
    );

    if (marcar) {
      assistidos[chave] = montarRegistro(idSerie, episodio);
    } else {
      delete assistidos[chave];
    }
  });

  gravar(CHAVE_EPISODIOS, assistidos);
  return assistidos;
};

export const contarEpisodiosDaSerie = (idSerie, assistidos) => {
  const lista = assistidos ? assistidos : lerEpisodiosAssistidos();

  return Object.values(lista).filter(
    (item) => Number(item.idSerie) === Number(idSerie)
  ).length;
};
