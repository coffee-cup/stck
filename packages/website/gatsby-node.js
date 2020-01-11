const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.onCreateWebpackConfig = ({
  actions: { replaceWebpackConfig },
  getConfig,
}) => {
  const config = getConfig();

  // config.module.rules.push({
  //   test: /\.worker\.ts$/,
  //   use: { loader: "workerize-loader" },
  // });

  config.output.globalObject = "this";

  replaceWebpackConfig(config);
};
