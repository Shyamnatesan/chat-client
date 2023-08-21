import React from "react";
export default function MessageDisplay() {
  const componentStyle = {
    backgroundImage: `url(${require("../../assets/pngtree-watercolor-graffiti-brush-scribble-background-image_725792.jpeg")})`,
    backgroundSize: "cover", // Adjust as needed
    backgroundRepeat: "no-repeat", // Adjust as needed
    backgroundPosition: "center", // Adjust as needed
    padding: "20px",
    color: "white",
    borderRadius: "15px",
  };
  return <div className="flex-grow-1 p-2" style={componentStyle}></div>;
}
