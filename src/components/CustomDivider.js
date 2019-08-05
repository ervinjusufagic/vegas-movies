import React from "react";
import { Divider } from "antd";

export default function CustomDivider() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
      }}
    >
      <Divider
        style={{ minWidth: "90%", width: "90%", background: "#993e25" }}
      />
    </div>
  );
}
