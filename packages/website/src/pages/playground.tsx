import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import { interpret, parse, State as IState } from "stck";
import { Styled } from "theme-ui";
import Editor from "../components/Editor";
import Layout from "../components/Layout";
import Stack from "../components/Stack";
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
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    backgroundColor: "#282c34",
    height: "100%",
    p: 2,
    borderLeft: "solid 2px",
    borderColor: "primary",
  }),
);

const Stacks = styled.div(
  css({
    display: "flex",
    overflowX: "auto",
  }),
);

const State: React.FC<{ state: IState }> = props => {
  const stacks = props.state.stacks;
  const filtered = Object.keys(stacks).filter(
    key => stacks[key] != null && stacks[key].length > 0,
  );

  return (
    <Stacks>
      {filtered.map(name => (
        <Stack key={name} name={name} stack={stacks[name]} />
      ))}
    </Stacks>
  );
};

const useStck = (code: string) => {
  return React.useMemo(() => {
    try {
      const ast = parse(code);
      const result = interpret(ast);
      return { result };
    } catch (e) {
      if (e.location && e.location.start) {
        const start = e.location.start;
        const error = `Error ${start.line}:${start.column}\n\n${e.message}`;
        return { error };
      }

      return { error: e.message };
    }
  }, [code]);
};

const Playground = () => {
  const { code, actions } = useStore(store => ({
    code: store.code,
    actions: store.actions,
  }));

  const { result, error } = useStck(code);

  return (
    <Layout title="Playground" description="Try Stck!">
      <StyledPlayground className="playground">
        <Split className="split">
          <EditorContainer>
            <Editor value={code} onChange={actions.onCodeChange} />
          </EditorContainer>

          <ResultsContainer>
            <Results>
              {result != null && <State state={result} />}
              {error != null && error}
            </Results>
          </ResultsContainer>
        </Split>
      </StyledPlayground>
    </Layout>
  );
};

export default Playground;
