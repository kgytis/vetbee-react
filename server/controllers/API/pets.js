import fetch from "node-fetch";

const allPets = async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/pets");
    const data = await response.json();
    res.send(data);
  } catch (err) {
    res.send({ err: err });
  }
};

export { allPets };
