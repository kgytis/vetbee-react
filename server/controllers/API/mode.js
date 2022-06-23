import fetch from "node-fetch";

const getMode = async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/mode");
    const data = await response.json();
    res.send(data);
  } catch (err) {
    res.send({ err: err });
  }
};

const changeMode = async (req, res) => {
  try {
    console.log(req.body.modeToggle);
    fetch(`http://localhost:3000/mode/onlyDarkModeID`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "onlyDarkModeID",
        darkMode: req.body.modeToggle,
      }),
    }).then(res.send("Succesfully changed theme"));
  } catch (err) {
    res.send({ err: err });
  }
};

export { getMode, changeMode };
