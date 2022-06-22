import logo from "../assets/images/navBarLogo.png";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import AdditionLineTitle from "../components/AdditionLineTitle";

const HealthRecords = () => {
  const params = useParams();

  const navigationLinks = [
    {
      title: "Pets",
      route: "/",
    },
    {
      title: "Logs",
      route: `/health-record/${params.petId}`,
    },
  ];

  const [logs, setLogs] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);
  const [meds, setMeds] = useState(null);
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`/api/logs/${params.petId}`)
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
      });
    fetch(`/api/prescriptions/${params.petId}`)
      .then((res) => res.json())
      .then((data) => {
        setPrescriptions(data);
      });
    fetch(`/api/meds`)
      .then((res) => res.json())
      .then((data) => {
        setMeds(data);
      });
    fetch(`/api/pets/${params.petId}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
      });
  }, []);

  return (
    <>
      {!(logs && prescriptions && pet && meds) && <div>Loading...</div>}
      {logs && prescriptions && pet && meds && (
        <>
          <NavBar navigationLinks={navigationLinks} logo={logo} />
          <AdditionLineTitle title={`${pet.name}'s : Health Records`} />
          {logs.map((log) => {
            return <h4 key={log.id}>Log description - {log.description}</h4>;
          })}
          {prescriptions.map((prescription) => {
            return (
              <div key={prescription.id}>
                <h4>Prescription comment - {prescription.comment}</h4>
                <div>
                  {meds.map((med) => {
                    return (
                      med.id === prescription.medicationId && (
                        <h4 key={med.id}>Vaisto pavadinimas - {med.name}</h4>
                      )
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default HealthRecords;
