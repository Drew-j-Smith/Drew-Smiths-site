import React from "react";
import GlobalLayout from "./global-layout";
import { PageProps } from "gatsby";

type PostLayoutProps = {};

const post_layout = (props: PageProps<PostLayoutProps>) => {
  return (
    <GlobalLayout>
      <>
        <h1>{props.pageContext.frontmatter.title}</h1>
        {props.children}
      </>
    </GlobalLayout>
  );
};

export default post_layout;
