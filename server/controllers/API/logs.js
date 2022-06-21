import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

const allLogs = async (req, res) => {
  try {
    const response = await fetch(`http://localhost:3000/logs`);
    const data = await response.json();
    const petLogs = await data.filter(
      (log) => log.petId === Number(req.params.id)
    ); // prafiltruoja taip, kad grazintu tik pets'o logs
    res.send(petLogs);
  } catch (err) {
    res.send({ err: err });
  }
};

const newLog = async (req, res) => {
  try {
    const ID = uuid();
    console.log(req.body);
    console.log(req.params.id);
    fetch(`http://localhost:3000/logs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ID,
        petId: Number(req.params.id),
        description: req.body.logDescription,
        status: "Open",
      }),
    }).then(res.redirect(`/api/logs/${req.params.id}`));
  } catch (err) {
    res.send({ err: err });
  }
};

export { allLogs, newLog };
