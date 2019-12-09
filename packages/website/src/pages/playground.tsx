import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Styled } from "theme-ui";
import Layout from "../components/Layout";
import Editor from "../components/Editor";

const StyledPlayground = styled(Styled.div)(
  css({
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
    pb: 1,
  }),
);

const Playground = () => (
  <Layout>
    <StyledPlayground className="home">
      <Editor />
    </StyledPlayground>
  </Layout>
);

export default Playground;
