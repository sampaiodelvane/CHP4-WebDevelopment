export const formatarData = (data) => {
  if (!data) {
    return "Sem data";
  }

  const objeto = new Date(`${data}T00:00:00`);

  if (Number.isNaN(objeto.getTime())) {
    return "Sem data";
  }

  return objeto.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatarAno = (data) => {
  if (!data) {
    return "—";
  }
  return data.slice(0, 4);
};

export const formatarNota = (nota) => {
  if (!nota) {
    return "—";
  }
  return nota.toFixed(1).replace(".", ",");
};

export const formatarDuracao = (minutos) => {
  if (!minutos) {
    return "0 min";
  }

  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;

  if (horas === 0) {
    return `${resto} min`;
  }

  if (resto === 0) {
    return `${horas} h`;
  }

  return `${horas} h ${resto} min`;
};

export const calcularPorcentagem = (parte, total) => {
  if (!total) {
    return 0;
  }
  return Math.min(100, Math.round((parte / total) * 100));
};
