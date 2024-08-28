import React from "react";
import { Children } from "react";
import "../index.css";

export const Layout = ({ children }) => {
  return (
    <body className="min-h-full w-full bg-backgroundWhite flex">
      {Children}
    </body>
  );
};
