import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Link from "./Link";

const StyledHeader = styled.header(
  css({
    color: "text",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: props => props.sizes.header,
    pt: 3,
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
    <Logo>
      <Link to={props.home || "/"} empty>
        stck
      </Link>
    </Logo>
  </StyledHeader>
);

export default Header;
