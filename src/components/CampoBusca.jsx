import { useState } from "react";
import { useNavigate } from "react-router";
import { LuSearch } from "react-icons/lu";



const CampoBusca = ({ valorInicial = "", placeholder = "Buscar séries..." }) => {
  const [termo, setTermo] = useState(valorInicial);
  const navegar = useNavigate();

  const aoEnviar = (evento) => {
    evento.preventDefault();

    const limpo = termo.trim();

    if (limpo.length === 0) {
      return;
    }

    navegar(`/busca/${encodeURIComponent(limpo)}`);
  };

  return (
    <form className="campo-busca" onSubmit={aoEnviar} role="search">
      <LuSearch size={18} />
      <input
        type="search"
        value={termo}
        placeholder={placeholder}
        aria-label="Buscar séries"
        onChange={(evento) => setTermo(evento.target.value)}
      />
      <button type="submit" className="botao botao--pequeno">
        Buscar
      </button>
    </form>
  );
};

export default CampoBusca;
