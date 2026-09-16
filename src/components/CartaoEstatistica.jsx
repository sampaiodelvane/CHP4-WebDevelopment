const CartaoEstatistica = ({ icone: Icone, valor, rotulo }) => {
  return (
    <div className="cartao">
      <span className="cartao__icone">
        <Icone size={20} />
      </span>
      <strong className="cartao__valor">{valor}</strong>
      <span className="cartao__rotulo">{rotulo}</span>
    </div>
  );
};

export default CartaoEstatistica;
