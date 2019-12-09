import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
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

const Logo = styled.span(
  css({
    fontSize: 4,
    fontWeight: "bold",
    fontFamily: "heading",
  }),
);

const Header: React.FC<{ home?: string }> = props => (
  <StyledHeader>
    <Container>
      <Logo>
        <Link to={props.home || "/"} empty>
          stck
        </Link>
      </Logo>
    </Container>
  </StyledHeader>
);

export default Header;
