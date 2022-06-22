import Button from "./Button";
import { useNavigate } from "react-router-dom";

const PetCard = ({ ...props }) => {
  const { data: pets, setreFetch } = props;
  const navigate = useNavigate();
  //View Log functions

  const getPetsLogs = (id) => {
    fetch(`/api/logs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        navigate(`/health-record/${id}`, { state: data });
      });
  };

  //Delete function
  const petDeletion = (id, pet) => {
    fetch(`/api/pets/${id}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        type: pet.type,
        dob: pet.dob,
        name: pet.name,
        email: pet.clientMail,
        archived: true, //keiciama tik sita vieta, kitkas lieka tas pats
      }),
    })
      .then(() => setreFetch(true))
      .then(() => navigate("/"));
  };
  return (
    <>
      {pets.map((pet) => {
        return (
          <div className="card" key={pet.id}>
            <div>
              <h3>{pet.name}</h3>
              <h4>{pet.dob}</h4>
              <h4>{pet.clientMail}</h4>
            </div>
            <div className="buttonsDiv">
              <Button
                title="View Log"
                classname={"btn btn-primary"}
                action={getPetsLogs}
                id={pet.id}
              />
              <Button
                title="Delete"
                classname={"btn btn-outline-primary"}
                action={petDeletion}
                id={pet.id}
                pet={pet}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PetCard;
