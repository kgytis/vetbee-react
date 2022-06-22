import logo from "../assets/images/navBarLogo.png";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import AdditionLineTitle from "../components/AdditionLineTitle";
import LogCard from "../components/LogCard";
import PrescriptionCards from "../components/PrescriptionCards";
import Button from "../components/Button";

const HealthRecords = () => {
  const paramsURL = useParams();
  const params = paramsURL.petId;

  const navigationLinks = [
    {
      title: "Pets",
      route: "/",
    },
    {
      title: "Logs",
      route: `/health-record/${params}`,
    },
  ];

  const [logs, setLogs] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);
  const [meds, setMeds] = useState(null);
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`/api/logs/${params}`)
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
      });
    fetch(`/api/prescriptions/${params}`)
      .then((res) => res.json())
      .then((data) => {
        setPrescriptions(data);
      });
    fetch(`/api/meds`)
      .then((res) => res.json())
      .then((data) => {
        setMeds(data);
      });
    fetch(`/api/pets/${params}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
      });
  }, [params]);

  return (
    <>
      {!(logs && prescriptions && pet && meds) && <div>Loading...</div>}
      {logs && prescriptions && pet && meds && (
        <>
          <NavBar navigationLinks={navigationLinks} logo={logo} />
          <AdditionLineTitle title={`${pet.name}'s : Health Records`} />
          <div className="additionButtons">
            <Button title={"ADD PRESCRIPTION"} classname={"btn btn-primary"} />
            <Button title={"ADD LOG"} classname={"btn btn-outline-primary"} />
          </div>
          <LogCard data={logs} />
          <PrescriptionCards meds={meds} prescriptions={prescriptions} />
        </>
      )}
    </>
  );
};

export default HealthRecords;
