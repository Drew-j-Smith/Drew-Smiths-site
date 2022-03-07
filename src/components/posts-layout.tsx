import React from "react";
import Header from "./header";

type PostLayoutProps = {
  children: JSX.Element;
  date: string;
};

const post_layout = (props: PostLayoutProps) => (
  <>
    <Header
      title="Drew Smith"
      links={[
        { name: "Home", path: "/" },
        { name: "Posts", path: "/posts" },
      ]}
    ></Header>
    <h1>My Layout</h1>
    <div>
      {props.children} {props.date}
    </div>
  </>
);

export default post_layout;
