import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ListVideo } from "lucide-react";

import CampoBusca from "../components/CampoBusca.jsx";
import Carregando from "../components/Carregando.jsx";
import GradeSeries from "../components/GradeSeries.jsx";
import MensagemErro from "../components/MensagemErro.jsx";
import { listarSeriesEmAlta, listarSeriesNoAr } from "../servicos/tmdb.js";

const Inicio = () => {
  const [emAlta, setEmAlta] = useState([]);
  const [noAr, setNoAr] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const carregarSeries = async () => {
      setCarregando(true);
      setErro("");

      try {
        const respostaEmAlta = await listarSeriesEmAlta();
        const respostaNoAr = await listarSeriesNoAr();

        setEmAlta(respostaEmAlta.results.slice(0, 10));
        setNoAr(respostaNoAr.results.slice(0, 10));
      } catch (problema) {
        setErro(problema.message);
      }

      setCarregando(false);
    };

    carregarSeries();
  }, [tentativa]);

  return (
    <main className="conteudo">
      <section className="abertura">
        <h1>Saiba sempre em qual episódio você parou</h1>
        <p>
          O Próximo guarda o seu avanço episódio a episódio, mostra quanto falta
          para terminar cada série e devolve em números o tempo que você passou
          assistindo. Busque uma série para começar.
        </p>
        <CampoBusca placeholder="Ex.: Dark, The Bear, Severance..." />
      </section>

      {erro && (
        <MensagemErro
          mensagem={erro}
          aoTentarNovamente={() => setTentativa(tentativa + 1)}
        />
      )}

      {carregando && !erro && (
        <Carregando esqueleto texto="Carregando séries..." />
      )}

      {!carregando && !erro && (
        <>
          <section className="secao">
            <div className="secao__titulo">
              <h2>Em alta nesta semana</h2>
              <span>As mais acompanhadas agora</span>
            </div>
            <GradeSeries series={emAlta} />
          </section>

          <section className="secao">
            <div className="secao__titulo">
              <h2>No ar</h2>
              <span>Com episódios sendo lançados</span>
            </div>
            <GradeSeries series={noAr} />
          </section>

          <section className="secao">
            <div className="secao__titulo">
              <h2>Continuar assistindo</h2>
            </div>
            <Link to="/minha-lista" className="botao botao--secundario">
              <ListVideo size={16} />
              Abrir minha lista
            </Link>
          </section>
        </>
      )}
    </main>
  );
};

export default Inicio;
