import styled from "styled-components";

const StyledLogoImg = styled.img`
  width: auto;
  height: 80px;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: rgba(204, 223, 241, 0.8);
  height: 80px;
`;

const StyledUl = styled.ul`
  display: flex;
  width: 30%;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledLi = styled.li``;

export { StyledLogoImg, StyledNav, StyledLi, StyledUl };
