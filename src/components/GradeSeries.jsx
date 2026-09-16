import CardSerie from "./CardSerie.jsx";


const GradeSeries = ({ series, progressos }) => {
  return (
    <div className="grade">
      {series.map((serie) => (
        <CardSerie
          key={serie.id}
          serie={serie}
          progresso={progressos ? progressos[serie.id] : null}
        />
      ))}
    </div>
  );
};

export default GradeSeries;
