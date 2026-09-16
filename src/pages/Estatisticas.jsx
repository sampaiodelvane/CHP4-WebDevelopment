import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BarChart3, Clock, Compass, Layers, Tv } from "lucide-react";

import CartaoEstatistica from "../components/CartaoEstatistica.jsx";
import EstadoVazio from "../components/EstadoVazio.jsx";
import { calcularPorcentagem, formatarDuracao } from "../dados/formatacao.js";
import {
  lerEpisodiosAssistidos,
  lerSeriesAcompanhadas,
} from "../dados/armazenamento.js";

const DURACAO_PADRAO = 42;

const calcularResumo = (series, assistidos) => {
  const episodios = Object.values(assistidos);
  const listaSeries = Object.values(series);

  const minutos = episodios.reduce(
    (total, item) => total + (item.duracao || DURACAO_PADRAO),
    0
  );

  const concluidas = listaSeries.filter((serie) => {
    const daSerie = episodios.filter(
      (item) => Number(item.idSerie) === Number(serie.id)
    ).length;

    return serie.totalEpisodios > 0 && daSerie >= serie.totalEpisodios;
  }).length;

  const contagemPorGenero = {};

  listaSeries.forEach((serie) => {
    const daSerie = episodios.filter(
      (item) => Number(item.idSerie) === Number(serie.id)
    ).length;

    const generos = serie.generos || [];

    generos.forEach((genero) => {
      const atual = contagemPorGenero[genero] || 0;
      contagemPorGenero[genero] = atual + daSerie;
    });
  });

  const generos = Object.entries(contagemPorGenero)
    .map(([nome, quantidade]) => ({ nome, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 5);

  return {
    totalEpisodios: episodios.length,
    totalSeries: listaSeries.length,
    minutos,
    concluidas,
    generos,
  };
};

const Estatisticas = () => {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    setResumo(calcularResumo(lerSeriesAcompanhadas(), lerEpisodiosAssistidos()));
  }, []);

  if (!resumo) {
    return (
      <main className="conteudo">
        <section className="secao">
          <div className="secao__titulo">
            <h2>Estatísticas</h2>
          </div>
        </section>
      </main>
    );
  }

  if (resumo.totalEpisodios === 0) {
    return (
      <main className="conteudo">
        <section className="secao">
          <div className="secao__titulo">
            <h2>Estatísticas</h2>
          </div>

          <EstadoVazio
            icone={BarChart3}
            titulo="Ainda não há o que contar"
            descricao="Marque alguns episódios como assistidos e os seus números aparecem aqui."
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

  const maiorGenero =
    resumo.generos.length > 0 ? resumo.generos[0].quantidade : 1;

  return (
    <main className="conteudo">
      <section className="secao">
        <div className="secao__titulo">
          <h2>Estatísticas</h2>
          <span>Calculadas a partir do seu histórico neste navegador</span>
        </div>

        <div className="cartoes">
          <CartaoEstatistica
            icone={Layers}
            valor={resumo.totalEpisodios}
            rotulo="Episódios assistidos"
          />
          <CartaoEstatistica
            icone={Clock}
            valor={formatarDuracao(resumo.minutos)}
            rotulo="Tempo total de tela"
          />
          <CartaoEstatistica
            icone={Tv}
            valor={resumo.totalSeries}
            rotulo="Séries acompanhadas"
          />
          <CartaoEstatistica
            icone={BarChart3}
            valor={resumo.concluidas}
            rotulo="Séries concluídas"
          />
        </div>
      </section>

      {resumo.generos.length > 0 && (
        <section className="secao">
          <div className="secao__titulo">
            <h2>Gêneros mais assistidos</h2>
            <span>Por episódios marcados</span>
          </div>

          <div className="lista-barras">
            {resumo.generos.map((genero) => (
              <div className="lista-barras__item" key={genero.nome}>
                <div className="lista-barras__rotulo">
                  <span>{genero.nome}</span>
                  <span>{genero.quantidade} ep.</span>
                </div>

                <div className="progresso__trilha">
                  <div
                    className="progresso__preenchimento"
                    style={{
                      width: `${calcularPorcentagem(genero.quantidade, maiorGenero)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Estatisticas;
