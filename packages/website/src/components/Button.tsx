import css from "@styled-system/css";
import styled from "@emotion/styled";
import { Styled } from "theme-ui";

export interface Props {
  primary?: number;
}

const Button = styled.button<Props>(props =>
  css({
    appearance: "none",
    display: "inline-block",
    backgroundColor: props.primary ? "primary" : "background",
    color: props.primary ? "white" : "primary",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: "bold",
    mx: 0,
    my: 1,
    px: 3,
    py: 2,
    minHeight: [48, "initial"],
    border: props.primary ? 0 : "solid 1px",
    borderColor: "primary",
    borderRadius: 2,
    cursor: "pointer",
    transition: "all 250ms ease-in-out",

    "&:hover": {
      backgroundColor: "primary",
      opacity: props.primary ? 0.6 : 1.0,
      color: "white",
    },
  }),
);

export default Button;
