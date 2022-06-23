const MedCard = ({ ...props }) => {
  const { data: meds } = props;
  return (
    <>
      {meds.map((med) => {
        return (
          <div className="card" key={med.id}>
            <h5>{med.name}</h5>
            <p>
              Medicine description
              <br />
              {med.description}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default MedCard;
