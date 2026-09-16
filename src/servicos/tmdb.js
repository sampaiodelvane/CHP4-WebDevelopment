const URL_BASE = "https://api.themoviedb.org/3";
const URL_IMAGENS = "https://image.tmdb.org/t/p";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const IDIOMA = "pt-BR";

const buscarNaApi = async (caminho, parametros = {}) => {
  if (!TOKEN) {
    throw new Error(
      "Token do TMDB não encontrado. Crie o arquivo .env.local com VITE_TMDB_TOKEN."
    );
  }

  const query = new URLSearchParams({ language: IDIOMA, ...parametros });

  const resposta = await fetch(`${URL_BASE}${caminho}?${query}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!resposta.ok) {
    throw new Error(`Não foi possível carregar os dados (erro ${resposta.status}).`);
  }

  return resposta.json();
};

export const montarUrlImagem = (caminho, tamanho = "w342") => {
  if (!caminho) {
    return null;
  }
  return `${URL_IMAGENS}/${tamanho}${caminho}`;
};

export const listarSeriesEmAlta = () => buscarNaApi("/trending/tv/week");

export const listarSeriesNoAr = () => buscarNaApi("/tv/on_the_air");

export const buscarSeriesPorTermo = (termo) =>
  buscarNaApi("/search/tv", { query: termo });

export const buscarSerie = (idSerie) => buscarNaApi(`/tv/${idSerie}`);

export const buscarTemporada = (idSerie, numeroTemporada) =>
  buscarNaApi(`/tv/${idSerie}/season/${numeroTemporada}`);
