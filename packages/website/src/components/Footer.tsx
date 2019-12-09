import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Section from "./Section";

const StyledFooter = styled.footer(
  css({
    display: "flex",
    alignItems: "center",
  }),
);

const Footer = () => (
  <StyledFooter>
    <Section>
      <h3>♥</h3>
    </Section>
  </StyledFooter>
);

export default Footer;
