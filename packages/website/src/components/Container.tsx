import * as React from "react";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
  max-width: 48ch;
`;

const Container: React.FC = props => (
  <StyledContainer>{props.children}</StyledContainer>
);

export default Container;
