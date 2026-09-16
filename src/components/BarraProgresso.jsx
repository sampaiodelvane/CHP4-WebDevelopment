import { calcularPorcentagem } from "../dados/formatacao.js";

const BarraProgresso = ({ assistidos, total, mostrarLegenda = true }) => {
  const porcentagem = calcularPorcentagem(assistidos, total);

  return (
    <div className="progresso">
      <div
        className="progresso__trilha"
        role="progressbar"
        aria-valuenow={porcentagem}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso"
      >
        <div
          className="progresso__preenchimento"
          style={{ width: `${porcentagem}%` }}
        />
      </div>

      {mostrarLegenda && (
        <div className="progresso__legenda">
          <span>
            {assistidos} de {total || "?"} episódios
          </span>
          <span>{porcentagem}%</span>
        </div>
      )}
    </div>
  );
};

export default BarraProgresso;
