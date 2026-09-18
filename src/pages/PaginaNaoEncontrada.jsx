import { Link } from "react-router";
import { LuCompass, LuTvMinimal } from "react-icons/lu";

import EstadoVazio from "../components/EstadoVazio.jsx";

const PaginaNaoEncontrada = () => {
  return (
    <main className="conteudo">
      <EstadoVazio
        icone={LuTvMinimal}
        titulo="Não encontramos esta página"
        descricao="O endereço pode estar errado ou o conteúdo não existe mais."
      >
        <Link to="/" className="botao">
          <LuCompass size={16} />
          Voltar para o início
        </Link>
      </EstadoVazio>
    </main>
  );
};

export default PaginaNaoEncontrada;
