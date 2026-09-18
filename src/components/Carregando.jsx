import { LuLoaderCircle } from "react-icons/lu";



const Carregando = ({ texto = "Carregando...", esqueleto = false }) => {
  const blocos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (esqueleto) {
    return (
      <div className="esqueleto" aria-busy="true" aria-label={texto}>
        {blocos.map((bloco) => (
          <div key={bloco} className="esqueleto__item" />
        ))}
      </div>
    );
  }

  return (
    <p className="carregando" aria-busy="true">
      <LuLoaderCircle size={18} className="girando" />
      {texto}
    </p>
  );
};

export default Carregando;
