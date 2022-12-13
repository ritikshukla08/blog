import React from "react";
import { Footer } from "./Footer";
import HeaderSearch from "./HeaderSearch";

const Layout = (props) => {
  return (
    <>
      <HeaderSearch />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
