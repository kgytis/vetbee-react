import "./App.css";

import PetList from "./pages/PetList";
import HealthRecords from "./pages/HealthRecords";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path={`/health-record/:petId`} element={<HealthRecords />} />
      </Routes>
    </>
  );
};

export default App;
