import ThemeUIPrism from "@theme-ui/prism";
import PrismCore from "prism-react-renderer/prism";
import * as React from "react";
import Link from "../components/Link";

((typeof global !== "undefined" ? global : window) as any).Prism = PrismCore;
// tslint:disable:no-var-requires
require("prismjs/components/prism-haskell");
require("prismjs/components/prism-tsx");
// tslint:enable

export default {
  pre: props => props.children,
  code: props => <ThemeUIPrism {...props} Prism={PrismCore} />,
  a: Link,
};
