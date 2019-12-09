import * as React from "react";
import ThemeUIPrism from "@theme-ui/prism";
import Link from "../components/Link";
import PrismCore from "prism-react-renderer/prism";

((typeof global !== "undefined" ? global : window) as any).Prism = PrismCore;
// tslint:disable-next-line:no-var-requires
require("prismjs/components/prism-haskell");
require("prismjs/components/prism-tsx");

export default {
  pre: props => props.children,
  code: props => <ThemeUIPrism {...props} Prism={PrismCore} />,
  a: Link,
};
