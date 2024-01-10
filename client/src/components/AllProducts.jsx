import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import {
  getProducts,
  getProductById,
} from "../features/productReducer";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { products, isLoading, isSuccess, isUpdate } = useSelector(
    (state) => state.productState
  );

  useEffect(() => {
    if (isLoading || !isSuccess || isUpdate) {
      dispatch(getProducts());
    }
  }, [isLoading, isSuccess, isUpdate, dispatch]);

  const duzenleKayit = (prod)=> {
    let id = prod.id
    dispatch(getProductById(id))
    navigate("/duzenle")
  }

  return (
    <table className="table">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Ürün Adı</th>
          <th>Açıklama</th>
          <th>İşlem</th>
        </tr>
      </thead>
      {products && products.length > 0 && (
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
            <td>{prod.id}</td>
            <td>{prod.name}</td>
            <td>{prod.description}</td>
            <td className="d-flex justify-content-start gap-2">
            <button className="btn btn-danger">Sil</button>
            <button className="btn btn-primary" onClick={() => duzenleKayit(prod)}>Düzenle</button>
            </td>
          </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default AllProducts;
