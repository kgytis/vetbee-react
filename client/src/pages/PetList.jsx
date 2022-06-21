import NavBar from "../components/NavBar";
import logo from "../assets/images/navBarLogo.png";

const navigationLinks = [
  {
    title: "Pets",
    route: "/pets",
  },
  {
    title: "Medications",
    route: "/meds",
  },
];

const PetList = () => {
  return (
    <>
      <NavBar navigationLinks={navigationLinks} logo={logo} />
    </>
  );
};

export default PetList;
