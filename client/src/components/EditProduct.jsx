import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../features/productReducer";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editProduct, isEdit } = useSelector((state) => state.productState);
  const [data, setData] = useState({
    id: "",
    name: "",
    description: "",
  });
  const { id, name, description } = data;

  useEffect(() => {
    if (editProduct && editProduct?.id && isEdit) {
      setData((prevState) => ({
        ...prevState,
        id: editProduct.id,
        name: editProduct.name,
        description: editProduct.description,
      }));
    }
  }, [editProduct, isEdit]);

  const onChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const veriSifirla = () => {
    setData({
      id: "",
      name: "",
      description: "",
    });
  };

  const productGuncelle = () => {
    dispatch(updateProduct(data));
    veriSifirla()
    navigate("/");
  };

  return (
    <div className="container">
      <button
        className="btn btn-warning"
        onClick={() => {
          veriSifirla();
          navigate("/");
        }}
      >
        Geri Dön
      </button>
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
        onClick={() => productGuncelle()}
      >
        Güncelle
      </button>
    </div>
  );
};

export default EditProduct;
