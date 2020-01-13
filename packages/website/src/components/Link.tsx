import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Link as GLink } from "gatsby";
import * as React from "react";
import { Styled } from "theme-ui";
import theme from "../gatsby-plugin-theme-ui";
import Button, { Props as ButtonProps } from "./Button";

const StyledLink = styled(GLink)<{ empty: number }>(props =>
  css({
    ...(props.empty
      ? {
          ...theme.styles.a,
          textDecoration: "none",
        }
      : theme.styles.a),
  }),
);

export interface Props {
  to: string;
  href?: string;
  empty?: boolean;
  target?: string;
  className?: string;
}

const isExternalLink = (href: string): boolean =>
  href.startsWith("http://") || href.startsWith("https://");

const Link: React.FC<Props> = props => {
  const href = props.href || props.to;
  if (isExternalLink(href)) {
    return (
      <Styled.a href={href} target="_blank" rel="noopener" {...props}>
        {props.children}
      </Styled.a>
    );
  }

  return (
    <StyledLink to={href} {...{ ...props, empty: props.empty ? 1 : 0 }}>
      {props.children}
    </StyledLink>
  );
};

export default Link;

export const EmptyLink: React.FC<Props> = props => (
  <Link empty={true} {...props} />
);

export const MdxLink: React.FC<any> = props => {
  return <Link {...props} />;
};

const StyledButtonLink = styled(Button)(
  css({
    display: "inline-flex",
    alignItems: "center",
  }),
);

export const ButtonLink: React.FC<Props & ButtonProps> = props => (
  <StyledButtonLink {...props} as={EmptyLink} />
);
