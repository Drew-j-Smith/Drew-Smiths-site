/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-sass", {
    resolve: `gatsby-plugin-mdx`,
    options: {
      defaultLayouts: {
        posts: require.resolve("./src/components/posts-layout.tsx"),
      },
    },
  }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "posts",
        "path": "./src/posts/"
      },
    }, {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./src/posts",
      },
    },]
};