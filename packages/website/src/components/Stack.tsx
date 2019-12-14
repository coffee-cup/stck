import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import { Stack as IStack } from "stck";

const StyledStack = styled.div(
  css({
    mx: 2,
    p: 2,
    minWidth: "150px",
    fontFamily: "monospace",
    borderRight: "solid 1px white",
  }),
);

const HeaderContainer = styled.div(css({}));

const Header = styled.h3(
  css({
    m: 0,
    pb: 1,
  }),
);

const List = styled.div(css({}));

const Item = styled.div(css({}));

const Stack: React.FC<{ stack: IStack; name: string }> = ({ stack, name }) => (
  <StyledStack>
    <HeaderContainer>
      <Header>stack {name}</Header>
    </HeaderContainer>

    <List>
      {stack.map((item, i) => (
        <Item key={i}>{item}</Item>
      ))}
    </List>
  </StyledStack>
);

export default Stack;
