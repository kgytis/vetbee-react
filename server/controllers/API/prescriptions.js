import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

const allPrescriptions = async (req, res) => {
  try {
    // Prescriptions fetch
    const presRes = await fetch(`http://localhost:3000/prescriptions`);
    const presData = await presRes.json();
    const petPrescriptions = await presData.filter(
      (prescription) => prescription.petId === Number(req.params.id)
    );
    // const medRes = await fetch(`http://localhost:3000/meds`);
    // const medData = await medRes.json();

    res.send(petPrescriptions);
    // res.send(medData);
  } catch (err) {
    res.send({ err: err });
  }
};

const newPrescription = async (req, res) => {
  try {
    const ID = uuid();
    console.log(req.body);
    console.log(req.params.id);
    fetch(`http://localhost:3000/prescriptions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ID,
        medicationId: req.body.medId, // cia geriau front'e tureti selecta, kuris bus padarytas pagal medication fetch'a
        petId: Number(req.params.id),
        comment: req.body.comment,
        timeStamp: new Date().toLocaleString("LT").slice(0, 10),
      }),
    }).then(res.redirect(`/api/prescriptions/${req.params.id}`));
  } catch (err) {
    res.send({ err: err });
  }
};

export { allPrescriptions, newPrescription };
