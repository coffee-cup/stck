import * as React from "react";
import styled from "@emotion/styled";
import { makeAnchor } from "../utils";
import { Styled } from "theme-ui";
import css from "@styled-system/css";

export const H1: React.FC = props => (
  <h1 id={makeAnchor(props.children)} {...props} />
);
export const H2: React.FC = props => (
  <h2 id={makeAnchor(props.children)} {...props} />
);
export const H3: React.FC = props => <h3 {...props} />;

export const Title = styled.h1(
  css({
    mb: 0,
    fontSize: 6,
  }),
);

export const Detail = styled.span`
  display: block;
  font-size: 0.9em;
  color: grey;
`;

const StyledHeading = styled(Styled.div)(
  css({
    m: 0,
    p: 0,
  }),
);

const HeadingTitle = styled(Styled.h1)(
  css({
    fontSize: ["6rem", "8rem"],
    mt: 0,
    mb: 2,
    p: 0,
    ml: "-8px",
  }),
);

const HeadingSubTitle = styled(Styled.h2)(
  css({
    fontSize: 5,
    m: 0,
  }),
);

interface Props {
  title: string;
  subtitle?: string;
}

export const Heading: React.FC<Props> = props => (
  <StyledHeading>
    <HeadingTitle>{props.title}</HeadingTitle>
    {props.subtitle && <HeadingSubTitle>{props.subtitle}</HeadingSubTitle>}
  </StyledHeading>
);
