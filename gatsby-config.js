/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: "Drew-Smiths-site",
    siteUrl: "https://funplayer.xyz",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          posts: require.resolve("./src/components/posts-layout.tsx"),
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./src/posts/",
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./src/posts",
      },
    },
  ],
};
