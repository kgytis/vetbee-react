const PrescriptionCards = ({ ...props }) => {
  const { meds, prescriptions } = props;

  return prescriptions.map((prescription) => {
    return (
      <div key={prescription.id} className="card">
        {meds.map((med) => {
          return (
            med.id === prescription.medicationId && (
              <div key={med.id}>
                <h5 key={med.id}>{med.name}</h5>
                <p>
                  Prescription comment <br /> {prescription.comment}
                </p>
                <p>
                  Medicine issuance date <br />
                  {prescription.timestamp}{" "}
                </p>
              </div>
            )
          );
        })}
      </div>
    );
  });
};

export default PrescriptionCards;
