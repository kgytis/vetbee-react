import logo from "../assets/images/navBarLogo.png";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";

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

  console.log(params.petId);
  const [logs, setLogs] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);
  const [meds, setMeds] = useState(null);
  //   const [isPending, setIsPending] = useState(true);

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
  }, []);

  console.log(logs);
  console.log(prescriptions);
  console.log(meds);

  return (
    <>
      {!(logs && prescriptions) && <div>Loading...</div>}
      {logs && prescriptions && (
        <>
          <NavBar navigationLinks={navigationLinks} logo={logo} />
          {logs.map((log) => {
            return <div>{log.description}</div>;
          })}
          {prescriptions.map((log) => {
            return <div>{log.comment}</div>;
          })}
        </>
      )}
    </>
  );
};

export default HealthRecords;
