import React from "react";
import spinner from "./asset/spinner.gif";

function Spinner() {
  return (
    <div className="w-100 mt-20">
      <img
        width={180}
        className="text-center mx-auto"
        src={spinner}
        alt="Loding..."
      />
    </div>
  );
}

export default Spinner;
