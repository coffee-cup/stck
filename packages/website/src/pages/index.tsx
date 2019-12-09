import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Styled } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import Container from "../components/Container";

const StyledHome = styled(Styled.div)(
  css({
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
    pb: 1,
  }),
);

const Home = () => (
  <Layout noHeader>
    <StyledHome className="home">
      <Container>
        <h1>Stck</h1>
        <p>Stack based programming language</p>

        <Link to="/playground">Playground</Link>
      </Container>
    </StyledHome>
  </Layout>
);

export default Home;
