const EstadoVazio = ({ icone: Icone, titulo, descricao, children }) => {
  return (
    <div className="vazio">
      {Icone && <Icone size={30} />}
      <h3>{titulo}</h3>
      {descricao && <p>{descricao}</p>}
      {children}
    </div>
  );
};

export default EstadoVazio;
