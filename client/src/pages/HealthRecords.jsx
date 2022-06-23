import logo from "../assets/images/navBarLogo.png";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import AdditionLineTitle from "../components/AdditionLineTitle";
import LogCard from "../components/LogCard";
import PrescriptionCards from "../components/PrescriptionCards";
import Button from "../components/Button";
import FormButton from "../components/FormButton";

// MUI imports------------------------------------------------
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const HealthRecords = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [medications, setMedications] = useState("");

  const handleChange = (event) => {
    setMedications(event.target.value);
  };

  const paramsURL = useParams();
  const params = paramsURL.petId;

  const navigationLinks = [
    {
      title: "Pets",
      route: "/",
    },
    {
      title: "Medications",
      route: `/meds`,
    },
  ];

  const [logs, setLogs] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);
  const [meds, setMeds] = useState(null);
  const [pet, setPet] = useState(null);

  const [reFetch, setreFetch] = useState(false);

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
  }, [params, reFetch]);

  const newLog = (e) => {
    e.preventDefault();
    fetch(`api/logs/${params}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logDescription: e.target.elements.logDescription.value,
        status: e.target.elements.status.value,
      }),
    })
      .then(() => handleClose())
      .then(() => setreFetch(true));
  };

  const newPrescription = (e) => {
    e.preventDefault();
    fetch(`api/prescriptions/${params}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medId: e.target.elements.medId.value,
        comment: e.target.elements.comment.value,
      }),
    })
      .then(() => handleClose1())
      .then(() => setreFetch(true));
  };

  return (
    <>
      {!(logs && prescriptions && pet && meds) && <div>Loading...</div>}
      {logs && prescriptions && pet && meds && (
        <>
          <NavBar navigationLinks={navigationLinks} logo={logo} />
          <AdditionLineTitle title={`${pet.name}'s : Health Records`} />
          <div className="additionButtons">
            <Button
              title={"ADD PRESCRIPTION"}
              classname={"btn btn-primary"}
              action={handleClickOpen}
            />
            <Button
              title={"ADD LOG"}
              classname={"btn btn-outline-primary"}
              action={handleClickOpen1}
            />
          </div>
          <LogCard data={logs} />
          <PrescriptionCards meds={meds} prescriptions={prescriptions} />
        </>
      )}

      {/* ----------------------------ADD PRESCRIPTION --------------------------------*/}
      {meds && prescriptions && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Prescription</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginBottom: "20px" }}>
              Please fill all fields to asign new prescription.
            </DialogContentText>
            <form
              action={`/api/prescriptions/${params}`}
              method="POST"
              onSubmit={() => newPrescription}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Medications
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={medications}
                  label="Medications"
                  onChange={handleChange}
                  fullWidth
                  name="medId"
                  MenuProps={{
                    PaperProps: { sx: { maxHeight: 200 } },
                  }}
                >
                  {meds &&
                    meds.map((med) => {
                      return (
                        <MenuItem key={med.id} value={med.id}>
                          {med.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="filled-multiline-flexible"
                  label="Comment"
                  multiline
                  fullWidth
                  variant="standard"
                  placeholder="Comment "
                  name="comment"
                  rows={3}
                />
              </FormControl>
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
      )}
      {/* ----------------------------ADD LOG DIALOG--------------------------------*/}
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>New Health Log</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill all fields to create new health log.
          </DialogContentText>
          <form
            action={`/api/logs/${params}`}
            method="POST"
            onSubmit={() => newLog}
          >
            <FormControl fullWidth>
              <TextField
                autoFocus
                required
                margin="dense"
                id="status"
                label="Status"
                type="text"
                fullWidth
                variant="standard"
                placeholder="Status"
                name="status"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                margin="dense"
                id="logDescription"
                label="Description"
                multiline
                fullWidth
                variant="standard"
                placeholder="Description"
                name="logDescription"
                rows={5}
              />
            </FormControl>

            <DialogActions>
              <FormButton
                title={"Submit"}
                classname={"btn btn-primary"}
                type="submit"
              />
              <Button
                title={"Close"}
                classname={"btn btn-outline-primary"}
                action={handleClose1}
              />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HealthRecords;
