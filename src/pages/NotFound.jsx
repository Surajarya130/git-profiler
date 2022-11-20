import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function NotFound() {
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <img src="https://http.cat/404" alt="cat-404" />
      <button className="bg-slate-600 mt-4 p-2 rounded-lg">
        <Link to="/" className="text-3xl">
          {" "}
          Go to Home{" "}
        </Link>
      </button>
    </div>
  );
}

export default NotFound;
