import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as ReactMarkdown from "react-markdown";
import Link from "./Link";

const StyledProject = styled.div(css({}));

const ProjectName = styled.h3(css({}));

const ProjectDesc = styled.div({});

/*
`
  a {
    color: ${props => props.theme.colours.accent};
    text-decoration: none;
    transition: opacity 150ms ease-in-out;

    &:hover {
      text-decoration: none;
      opacity: 0.6;
    }
  }
`;
*/

const Project: React.FC<{
  name: string;
  link: string;
  desc: string;
}> = props => (
  <StyledProject>
    <ProjectName>
      <Link to={props.link}>{props.name}</Link>
    </ProjectName>
    <ProjectDesc>
      <ReactMarkdown source={props.desc} />
    </ProjectDesc>
  </StyledProject>
);

export default Project;
