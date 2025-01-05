import React from "react";
import Navbar from "./navbar";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen m-0 p-0 pb-4">
      <Navbar />
      <>{children}</>
    </div>
  );
};

export default Layout;
