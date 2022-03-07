import React from "react";
import GlobalLayout from "./global-layout";

type PostLayoutProps = {
  children: JSX.Element;
};

const post_layout = (props: PostLayoutProps) => (
  <GlobalLayout>{props.children}</GlobalLayout>
);

export default post_layout;
