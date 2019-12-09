import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";

export interface Props {
  title?: string;
  description?: string;
  data?: {
    site: {
      siteMetadata: {
        siteShortTitle: string;
        description: string;
        author: string;
        url: string;
      };
    };
  };
}

const SEO: React.FC<Props> = props => {
  const data = useStaticQuery(query);
  const meta = data.site.siteMetadata;

  const title =
    props.title != null
      ? `${props.title} | ${meta.siteShortTitle}`
      : meta.siteShortTitle;
  const description = props.description || meta.description;

  return (
    <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
      />

      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {meta.image && <meta name="image" content={meta.image} />}

      {/* OpenGraph tags */}
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {meta.image && <meta property="og:image" content={meta.image} />}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={meta.userTwitter ? meta.userTwitter : ""}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {meta.image && <meta name="twitter:image" content={meta.image} />}
    </Helmet>
  );
};

export default SEO;

const query = graphql`
  query {
    site {
      siteMetadata {
        siteShortTitle
        description
        author
        url
      }
    }
  }
`;
