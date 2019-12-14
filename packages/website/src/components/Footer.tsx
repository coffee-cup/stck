import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import Container from "./Container";
import Section from "./Section";

const StyledFooter = styled.footer(
  css({
    display: "flex",
    alignItems: "center",
  }),
);

const Footer = () => (
  <StyledFooter>
    <Container>
      <Section>
        <h3>♥</h3>
      </Section>
    </Container>
  </StyledFooter>
);

export default Footer;
