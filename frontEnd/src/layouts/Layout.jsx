import React from "react";

export const Layout = ({ children }) => {
  return (
    <body className="min-h-screen w-full bg-backgroundWhite flex">
      {children}
    </body>
  );
};
