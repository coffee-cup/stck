import styled from "@emotion/styled";
import { MDXProvider } from "@mdx-js/react";
import css from "@styled-system/css";
import * as React from "react";
import { Styled } from "theme-ui";
import Footer from "./Footer";
import Header from "./Header";
import SEO from "./SEO";

export interface FrontMatter {
  title?: string;
  description?: string;
}

export interface Props extends FrontMatter {
  noHeader?: boolean;
  _frontmatter?: FrontMatter;
}

const ContentWrapper = styled(Styled.root)(
  css({
    color: "text",
    backgroundColor: "background",
    my: 0,
    mx: "auto",
    p: 0,
    fontSize: [2],
  }),
);

const Content = styled.main(
  css({
    minHeight: props => `calc(100vh - ${props.sizes.header})`,
  }),
);

const Layout: React.FC<Props> = ({ children, ...rest }) => {
  const frontmatter = rest._frontmatter || rest || {};

  return (
    <MDXProvider>
      <SEO title={frontmatter.title} description={frontmatter.description} />

      <ContentWrapper className="wrapper">
        {!rest.noHeader && <Header />}

        <Content>{children}</Content>

        <Footer />
      </ContentWrapper>
    </MDXProvider>
  );
};

export default Layout;
