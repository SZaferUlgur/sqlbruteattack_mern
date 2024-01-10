import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/productReducer";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const { name, description } = data;

  const onChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const productKaydet = () => {
    dispatch(createProduct(data));
    navigate("/")
  };

  return (
    <div className="container">
      <div className="input">
        <label htmlFor="name">Name :</label>
        <input
          className="form-control"
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={onChange}
          autoComplete="new-password"
        />
      </div>
      <br />
      <div className="input">
        <label htmlFor="name">Description :</label>
        <input
          className="form-control"
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={onChange}
          autoComplete="new-password"
        />
      </div>
      <button
        className="btn btn-success mt-2 btn-block"
        onClick={() => productKaydet()}
      >
        Kaydet
      </button>
    </div>
  );
};

export default AddProduct;
