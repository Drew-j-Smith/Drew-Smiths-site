import React from "react";
import { Link, graphql, PageProps } from "gatsby";
import GlobalLayout from "../components/global-layout";

type PostsProps = {
  allMdx: {
    nodes: [
      {
        frontmatter: {
          date: string;
          title: string;
        };
        slug: string;
      }
    ];
  };
};

class Posts extends React.Component<PageProps<PostsProps>, {}> {
  data;
  constructor(data: PageProps<PostsProps>) {
    super(data);
    this.data = data.data.allMdx.nodes;
  }

  render() {
    return (
      <GlobalLayout>
        <>
          {this.data.map((el) => {
            return (
              <p key={el.slug}>
                <Link to={"/posts/" + el.slug}>{el.frontmatter.title}</Link>{" "}
                {el.frontmatter.date}
              </p>
            );
          })}
        </>
      </GlobalLayout>
    );
  }
}

export const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          date(formatString: "MM/DD/YY")
          title
        }
        slug
      }
    }
  }
`;

export default Posts;
