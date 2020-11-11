import React from "react";
import { Meta, Scripts, Styles, Routes, useGlobalData } from "@remix-run/react";

export default function App() {
  let data = useGlobalData();
  console.log(data);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Styles />
      </head>
      <body>
        <Routes />
        <Scripts />
        <footer>
          <p>This page was rendered at </p>
        </footer>
      </body>
    </html>
  );
}
