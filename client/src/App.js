import "./App.css";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between">
        <h1>Product List</h1>
        <div className="d-flex justify-content-between gap-2">
          <button className="btn btn-primary" onClick={() => navigate("/ekle")}>
            Ekle
          </button>
        </div>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
export default App;
