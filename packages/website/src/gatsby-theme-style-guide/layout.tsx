import * as React from "react";
import PageLayout from "../components/Layout";

const Layout: React.FC = props => (
  <PageLayout title="Style guide">{props.children}</PageLayout>
);

export default Layout;
