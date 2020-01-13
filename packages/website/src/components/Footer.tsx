import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import Section from "./Section";
import Container from "./Container";
import Link from "./Link";

const StyledFooter = styled.footer(
  css({
    display: "flex",
    alignItems: "center",
    mt: 4,
    borderTop: "solid 4px",
    borderColor: "primary",
  }),
);

const Footer = () => (
  <StyledFooter>
    <Container>
      <Section>
        Made with {"♥"} by <Link to="https://jakerunzer.com">jake runzer</Link>
      </Section>
    </Container>
  </StyledFooter>
);

export default Footer;
