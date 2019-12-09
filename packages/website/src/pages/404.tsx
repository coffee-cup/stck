import * as React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import css from "@styled-system/css";
import styled from "@emotion/styled";
import Link from "../components/Link";

const Centered = styled.div(
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  }),
);

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not Found" />
    <Centered>
      <div>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </div>
    </Centered>
  </Layout>
);

export default NotFoundPage;
