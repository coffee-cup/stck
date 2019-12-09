import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Section from "./Section";
import Container from "./Container";

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
