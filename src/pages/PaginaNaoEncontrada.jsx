import { Link } from "react-router";
import { Compass, TvMinimal } from "lucide-react";

import EstadoVazio from "../components/EstadoVazio.jsx";

const PaginaNaoEncontrada = () => {
  return (
    <main className="conteudo">
      <EstadoVazio
        icone={TvMinimal}
        titulo="Não encontramos esta página"
        descricao="O endereço pode estar errado ou o conteúdo não existe mais."
      >
        <Link to="/" className="botao">
          <Compass size={16} />
          Voltar para o início
        </Link>
      </EstadoVazio>
    </main>
  );
};

export default PaginaNaoEncontrada;
