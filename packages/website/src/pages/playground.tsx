import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Styled } from "theme-ui";
import Layout from "../components/Layout";
import Editor from "../components/Editor";
import { useStore } from "../store";

const StyledPlayground = styled(Styled.div)(
  css({
    display: "flex",
    minHeight: props => `calc(100vh - ${props.sizes.header})`,
  }),
);

const Split = styled.div(
  css({
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
  }),
);

const EditorContainer = styled.div(
  css({
    width: ["100%", "50%"],
  }),
);

const ResultsContainer = styled.div(
  css({
    width: ["100%", "50%"],
  }),
);

const Results = styled.div(
  css({
    backgroundColor: "darkgrey",
    minHeight: "400px",
    height: "100%",
  }),
);

const Playground = () => {
  const { code, actions } = useStore(store => ({
    code: store.code,
    actions: store.actions,
  }));

  return (
    <Layout>
      <StyledPlayground className="playground">
        <Split className="split">
          <EditorContainer>
            <Editor value={code} onChange={actions.onCodeChange} />
          </EditorContainer>

          <ResultsContainer>
            <Results />
          </ResultsContainer>
        </Split>
      </StyledPlayground>
    </Layout>
  );
};

export default Playground;
