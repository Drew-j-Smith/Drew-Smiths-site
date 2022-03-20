import React from "react";
import GlobalLayout from "../components/global-layout";
import { PageProps, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

type PostLayoutProps = {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
    };
    body: string;
  };
};

const post_layout = (props: PageProps<PostLayoutProps>) => (
  <GlobalLayout>
    <div style={{ padding: "1rem" }}>
      <h1>{props.data.mdx.frontmatter.title}</h1>
      <p>{props.data.mdx.frontmatter.date}</p>
      <div style={{ padding: "0 1rem" }}>
        <MDXRenderer children={props.data.mdx.body}></MDXRenderer>
      </div>
    </div>
  </GlobalLayout>
);

export default post_layout;

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`;
