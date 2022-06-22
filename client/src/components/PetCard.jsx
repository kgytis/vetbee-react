import Button from "./Button";
import { useNavigate } from "react-router-dom";

const PetCard = ({ ...props }) => {
  const { data: pets } = props;
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
              <Button title="Delete" classname={"btn btn-outline-primary"} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PetCard;
