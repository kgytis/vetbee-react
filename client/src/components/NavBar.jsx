import { Link } from "react-router-dom";

import "../assets/styles/Navigation.css";
//Style imports

const NavBar = ({ ...props }) => {
  const { navigationLinks, logo } = props; // grazina linku objektu array
  console.log(navigationLinks);
  // prirasyti prie Link dar ir element, i kuri jsx faila redirectina
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <ul>
        {navigationLinks.map((link, i) => (
          <Link to={link.route} key={i}>
            <li key={i}>{link.title}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
