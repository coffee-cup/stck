// Heavily inspired by https://github.com/gatsbyjs/gatsby/blob/561d33e2e491d3971cb2a404eec9705a5a493602/www/src/components/code-block/index.js

import Highlight, { defaultProps, Language } from "prism-react-renderer";
import Prism from "prism-react-renderer/prism";
import * as React from "react";
import styled from "styled-components";
import normalize from "./normalize";

((typeof global !== "undefined" ? global : window) as any).Prism = Prism;
// tslint:disable-next-line:no-var-requires
require("prismjs/components/prism-haskell");

const StyledCode = styled.div`
  position: relative;
  padding: 0.5rem 0;
`;

const getParams = (name = "") => {
  const [lang, params = ""] = name.split(":");

  const splitParams = params.split(`&`).reduce((merged, param) => {
    const [key, value] = param.split(`=`);
    merged[key] = value;
    return merged;
  }, {}) as any;

  return [
    lang
      .split(`language-`)
      .pop()!
      .split(`{`)
      .shift()!,
  ].concat(splitParams);
};

const Code = ({
  children,
  className = children.props ? children.props.className : "",
}) => {
  const [language, { title = "" }] = getParams(className) as any;

  const [content, highlights] = normalize(
    children.props && children.props.children
      ? children.props.children
      : children,
    className,
  );

  return (
    <StyledCode>
      <Highlight
        {...defaultProps}
        code={content}
        language={language as Language}
        theme={undefined}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <React.Fragment>
            {title && (
              <div className="gatsby-code-title">
                <h1>{title}</h1>
              </div>
            )}
            <div className="gatsby-highlight">
              <pre className={`language-${language}`}>
                <code className={`language-${language}`}>
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line, key: i });
                    const className = [lineProps.className]
                      .concat(highlights[i] && `gatsby-highlight-code-line`)
                      .filter(Boolean)
                      .join(` `);

                    return (
                      <div key={i} {...{ ...lineProps, className }}>
                        {line.map((token, key) => {
                          const tokenProps = getTokenProps({ token, key });
                          return <span key={key} {...tokenProps} />;
                        })}
                      </div>
                    );
                  })}
                </code>
              </pre>
            </div>
          </React.Fragment>
        )}
      </Highlight>{" "}
    </StyledCode>
  );
};

export default Code;
