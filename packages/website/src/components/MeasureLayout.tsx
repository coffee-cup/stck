import Layout from "./Layout";
import Container from "./Container";
import * as React from "react";

const MeasureLayout: React.FC = ({ children }) => (
  <Layout>
    <Container>{children}</Container>
  </Layout>
);

export default MeasureLayout;
