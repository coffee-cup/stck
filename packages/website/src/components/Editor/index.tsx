import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Styled } from "theme-ui";

const StyledEditor = styled(Styled.div)(
  css({
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
    pb: 1,
  }),
);

const Editor = () => <StyledEditor>This is the editor</StyledEditor>;

export default Editor;
