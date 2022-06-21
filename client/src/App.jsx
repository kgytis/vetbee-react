import "./App.css";

import PetList from "./pages/PetList";
import HealthRecords from "./pages/HealthRecords";
import { Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    fetch("api/pets")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setIsPending(false);
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<PetList />} />

        {!isPending &&
          data.map((pet, i) => (
            <Route
              path={`/health-record/:petId`}
              element={<HealthRecords />}
              key={i}
            />
          ))}
      </Routes>
    </>
  );
};

export default App;
