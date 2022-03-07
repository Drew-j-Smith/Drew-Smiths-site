import React from "react";
import Header from "./header";
import "../styles/components/global-layout.css";

type GlobalLayoutProps = {
  children: JSX.Element;
};

const GlobalLayout = (props: GlobalLayoutProps) => (
  <main>
    <title>Drew Smith</title>
    <Header
      title="Drew Smith"
      links={[
        { name: "Home", path: "/" },
        { name: "Posts", path: "/posts" },
      ]}
    ></Header>
    {props.children}
  </main>
);

export default GlobalLayout;
