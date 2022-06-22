import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

const allPets = async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/pets");
    const data = await response.json();
    console.log(data);
    const nonArchivedData = await data.filter((pet) => pet.archived !== true); // prafiltruoja taip, kad grazintu tik tuos pets, kurie nera archyvuoti
    res.send(nonArchivedData);
  } catch (err) {
    res.send({ err: err });
  }
};

const newPet = async (req, res) => {
  try {
    const ID = uuid();
    console.log(req.body);
    fetch("http://localhost:3000/pets", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ID,
        type: req.body.type,
        dob: req.body.dob,
        name: req.body.name,
        clientEmail: req.body.email,
        archived: false,
      }),
    }).then(res.redirect("/"));
  } catch (err) {
    res.send({ err: err });
  }
};

const deletePet = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    fetch(`http://localhost:3000/pets/${req.params.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // pasiziureti po to, kaip apsirasyti delete'a teisingai. t.y. kaip bus perduodama data
        id: req.params.id,
        type: req.body.type,
        dob: req.body.dob,
        name: req.body.name,
        clientEmail: req.body.email,
        archived: true, //keiciama tik sita vieta, kitkas lieka tas pats
      }),
    }).then(res.redirect("/"));
  } catch (err) {
    res.send({ err: err });
  }
};

const getOnePet = async (req, res) => {
  try {
    const response = await fetch(`http://localhost:3000/pets/${req.params.id}`);
    const data = await response.json();

    res.send(data);
  } catch (err) {
    res.send({ err: err });
  }
};

export { allPets, newPet, deletePet, getOnePet };
