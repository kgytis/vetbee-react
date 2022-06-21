import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsPending(false);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {data &&
        data.pets.map((pet, i) => {
          return <h2 key={i}>{pet}</h2>;
        })}
    </div>
  );
};

export default App;
