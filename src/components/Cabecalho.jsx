import { Link } from "react-router";
import { LuChartColumn, LuClapperboard, LuCompass, LuListVideo } from "react-icons/lu";


const Cabecalho = ({ quantidadeAcompanhando = 0 }) => {
  return (
    <header className="cabecalho">
      <div className="cabecalho__interno">
        <Link to="/" className="marca">
          <LuClapperboard size={22} />
          Novo TV Time
        </Link>

        <nav className="navegacao">
          <Link to="/" className="navegacao__link">
            <LuCompass size={17} />
            <span className="rotulo">Descobrir</span>
          </Link>

          <Link to="/minha-lista" className="navegacao__link">
            <LuListVideo size={17} />
            <span className="rotulo">Minha lista</span>
            {quantidadeAcompanhando > 0 && (
              <span className="navegacao__contador">
                {quantidadeAcompanhando}
              </span>
            )}
          </Link>

          <Link to="/estatisticas" className="navegacao__link">
            <LuChartColumn size={17} />
            <span className="rotulo">Estatísticas</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Cabecalho;
