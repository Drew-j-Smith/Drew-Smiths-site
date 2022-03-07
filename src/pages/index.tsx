import React from "react";
import Header from "../components/header";

const IndexPage = () => {
  return (
    <main>
      <Header
        title="Drew Smith"
        links={[
          { name: "Home", path: "/" },
          { name: "Posts", path: "/posts" },
        ]}
      ></Header>
      <p style={{ textAlign: "center" }}>
        This is a placeholder. The website is coming soon
      </p>
    </main>
  );
};

export default IndexPage;
