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
import PetCard from "../components/PetCard";
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
    fetch("/api/pets")
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

  const submitForm = (e) => {
    e.preventDefault();
    fetch("api/pets", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: e.target.elements.type.value,
        dob: e.target.elements.dob.value,
        name: e.target.elements.name.value,
        email: e.target.elements.email.value,
        archived: true, //keiciama tik sita vieta, kitkas lieka tas pats
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
            <AdditionLineTitle title={"Pet List"} />
            <div className="additionButtons">
              <Button
                title={"Add Pet"}
                classname={"btn btn-info"}
                action={handleClickOpen}
              />
            </div>
          </div>
          <PetCard data={data} reFetch={reFetch} setreFetch={setreFetch} />
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Pet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fillout ALL fields to insert to the system new pet data.
          </DialogContentText>
          <form action="/api/pets" method="POST" onSubmit={() => submitForm}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Pet Name"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Name"
              name="name"
            />
            <TextField
              required
              margin="dense"
              id="type"
              label="Pet Type"
              type="text"
              name="type"
              fullWidth
              variant="standard"
              placeholder="Dog, cat, etc..."
            />
            <TextField
              required
              margin="dense"
              id="dob"
              name="dob"
              label="Pet's date of birthday"
              type="date"
              fullWidth
              variant="standard"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Owners email address"
              type="email"
              fullWidth
              variant="standard"
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
