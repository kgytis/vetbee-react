// Asset imports ---------------------------------------------
//Photo imports
import logo from "../assets/images/navBarLogo.png";

// Style imports
import "../assets/styles/Content.css";

//------------------------------------------------------------
// Component imports -----------------------------------------
import NavBar from "../components/NavBar";
import AdditionLineTitle from "../components/AdditionLineTitle";
import Button from "../components/Button";
import PetCard from "../components/PetCard";
//------------------------------------------------------------
// Hook imports
import { useState, useEffect } from "react";

const navigationLinks = [
  {
    title: "Pets",
    route: "/",
  },
  {
    title: "Medications",
    route: "/meds",
  },
];

const PetList = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch("/api/pets")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsPending(false);
      });
  }, []);

  return (
    <>
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <>
          <NavBar navigationLinks={navigationLinks} logo={logo} />
          <div className="additionLine">
            <AdditionLineTitle title={"Pet List"} />
            <div className="additionButtons">
              <Button title={"Add Pet"} classname={"btn btn-info"} />
            </div>
          </div>
          <PetCard data={data} />
        </>
      )}
    </>
  );
};

export default PetList;
