import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import Link from "./Link";
import Container from "./Container";

const StyledHeader = styled.header(
  css({
    color: "text",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: props => props.sizes.header,
  }),
);

const HeaderContainer = styled.div(
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "container",
    mx: "auto",
    px: 4,
  }),
);

const Logo = styled.span(
  css({
    fontSize: 4,
    fontWeight: "bold",
    fontFamily: "heading",
  }),
);

const NavLink = styled(Link)(
  css({
    textDecoration: "none",
    pl: 3,
    fontWeight: "bold",
    fontSize: 1,
  }),
);

const StyledNav = styled.div(
  css({
    display: ["none", "block"],
  }),
);

const Nav = () => (
  <StyledNav>
    <NavLink to="/playground">playground</NavLink>
    <NavLink to="/spec">spec</NavLink>
    <NavLink to="https://github.com/coffee-cup/stck">github</NavLink>
  </StyledNav>
);

const Header: React.FC<{ home?: string }> = props => (
  <StyledHeader>
    <HeaderContainer>
      <Logo>
        <Link to={props.home || "/"} empty>
          stck
        </Link>
      </Logo>

      <Nav />
    </HeaderContainer>
  </StyledHeader>
);

export default Header;
