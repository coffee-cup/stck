import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Link from "../components/Link";

const links = [
  { text: "Github", href: "https://github.com/coffee-cup" },
  { text: "Keybase", href: "https://keybase.io/jakerunzer" },
  { text: "Twitter", href: "https://twitter.com/jakerunzer" },
  /* { text: "Writing", href: "/writing" }, */
  { text: "Projects", href: "/projects" },
];

const StyledMenu = styled.ul(
  css({
    listStyle: "none",
    pl: 0,
  }),
);

const MenuItem = styled.li(
  css({
    pl: 0,
    py: 1,
    fontWeight: "bold",
    fontSize: 2,
    textDecoration: "underline",
  }),
);

const Menu = () => (
  <StyledMenu>
    {links.map(l => (
      <MenuItem key={l.href}>
        <Link empty to={l.href}>
          {l.text}
        </Link>
      </MenuItem>
    ))}
  </StyledMenu>
);

export default Menu;
