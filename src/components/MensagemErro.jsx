import { AlertTriangle } from "lucide-react";

const MensagemErro = ({ mensagem, aoTentarNovamente }) => {
  return (
    <div className="aviso aviso--erro" role="alert">
      <AlertTriangle size={20} />
      <div>
        <p>{mensagem}</p>
        {aoTentarNovamente && (
          <button
            type="button"
            className="botao botao--secundario botao--pequeno botao--espacado"
            onClick={aoTentarNovamente}
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
};

export default MensagemErro;
