import React from "react";
import Header from "./Header";

export default function Layout({ children, reiniciar }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
      <Header reiniciar={reiniciar} />
      <main style={{ flex: 1, position: "relative", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}