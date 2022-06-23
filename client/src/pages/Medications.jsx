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
import FormButton from "../components/FormButton";
import MedCard from "../components/MedCard";
//------------------------------------------------------------
// import { useNavigate } from "react-router-dom";
// MUI imports------------------------------------------------
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
  const [reFetch, setreFetch] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/meds")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsPending(false);
        setreFetch(false);
      });
  }, [reFetch]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const newMedication = (e) => {
    e.preventDefault();
    fetch("api/meds", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medDescription: e.target.elements.medDescription.value,
        medName: e.target.elements.medName.value,
      }),
    })
      .then(() => handleClose())
      .then(() => setreFetch(true));
  };

  return (
    <>
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <>
          <NavBar navigationLinks={navigationLinks} logo={logo} />
          <div className="additionLine">
            <AdditionLineTitle title={"Medication list"} />
            {/* {Change above line for new title of the page } */}
            <div className="additionButtons">
              <Button
                title={"Add Medication"}
                classname={"btn btn-info"}
                action={handleClickOpen}
              />
            </div>
          </div>
          <MedCard data={data} reFetch={reFetch} setreFetch={setreFetch} />
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Medication</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fillout ALL fields to insert new medication into the system.
          </DialogContentText>
          <form action="/api/meds" method="POST" onSubmit={() => newMedication}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="medName"
              label="Medication name"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Medication"
              name="medName"
            />
            <TextField
              required
              margin="dense"
              id="medDescription"
              label="Comment"
              multiline
              fullWidth
              variant="standard"
              placeholder="Description"
              name="medDescription"
              rows={3}
            />
            <DialogActions>
              <FormButton
                title={"Submit"}
                classname={"btn btn-primary"}
                type="submit"
              />
              <Button
                title={"Close"}
                classname={"btn btn-outline-primary"}
                action={handleClose}
              />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PetList;
