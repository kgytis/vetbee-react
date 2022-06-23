import "./App.css";

import { Routes, Route } from "react-router-dom";

import PetList from "./pages/PetList";
import HealthRecords from "./pages/HealthRecords";

import Medications from "./pages/Medications";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path={`/health-record/:petId`} element={<HealthRecords />} />
        <Route path={`/meds`} element={<Medications />} />
      </Routes>
    </>
  );
};

export default App;
