import { Link } from "react-router-dom";

//Style imports
import {
  StyledLogoImg,
  StyledNav,
  StyledLi,
  StyledUl,
} from "../assets/styles/NavigationStyles";

const NavBar = ({ ...props }) => {
  const { navigationLinks, logo } = props; // grazina linku objektu array
  console.log(navigationLinks);
  // prirasyti prie Link dar ir element, i kuri jsx faila redirectina
  return (
    <StyledNav>
      <Link to="/">
        <StyledLogoImg src={logo} alt="Logo" />
      </Link>
      <StyledUl>
        {navigationLinks.map((link, i) => (
          <Link to={link.route} key={i} className={"btn btn-info"}>
            <StyledLi key={i}>{link.title}</StyledLi>
          </Link>
        ))}
      </StyledUl>
    </StyledNav>
  );
};

export default NavBar;
