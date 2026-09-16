import { Link } from "react-router";
import { BarChart3, Clapperboard, Compass, ListVideo } from "lucide-react";


const Cabecalho = ({ quantidadeAcompanhando = 0 }) => {
  return (
    <header className="cabecalho">
      <div className="cabecalho__interno">
        <Link to="/" className="marca">
          <Clapperboard size={22} />
          Novo TV Time
        </Link>

        <nav className="navegacao">
          <Link to="/" className="navegacao__link">
            <Compass size={17} />
            <span className="rotulo">Descobrir</span>
          </Link>

          <Link to="/minha-lista" className="navegacao__link">
            <ListVideo size={17} />
            <span className="rotulo">Minha lista</span>
            {quantidadeAcompanhando > 0 && (
              <span className="navegacao__contador">
                {quantidadeAcompanhando}
              </span>
            )}
          </Link>

          <Link to="/estatisticas" className="navegacao__link">
            <BarChart3 size={17} />
            <span className="rotulo">Estatísticas</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Cabecalho;
