import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

const allMeds = async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/meds");
    const data = await response.json();
    res.send(data);
  } catch (err) {
    res.send({ err: err });
  }
};

const newMed = async (req, res) => {
  try {
    const ID = uuid();
    console.log(req.body);
    fetch("http://localhost:3000/meds", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ID,
        name: req.body.medName,
        description: req.body.medDescription,
      }),
    }).then(res.redirect("/api/meds"));
  } catch (err) {
    res.send({ err: err });
  }
};

export { allMeds, newMed };
