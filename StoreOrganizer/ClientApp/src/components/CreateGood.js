import React, { useState, useCallback, useEffect } from "react";
import styles from "./Components.module.css";
import "./components.css";

const CreateGood = () => {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [goods, setGoods] = useState([]);
  const [price, setPrice] = useState("");
  const [stores, setStores] = useState([]);

  const getGoods = useCallback(() => {
    fetch("weatherforecast/getGoods")
      .then((response) => response.json())
      .then((data) => {
        setGoods(data);
      });
  }, []);

  const getStores = useCallback(() => {
    fetch("weatherforecast/getstores")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStores(data);
      });
  }, []);

  useEffect(() => {
    getGoods();
    getStores();
  }, [getGoods, getStores]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      fetch("weatherforecast/creategood", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setGoods((prevGoods) => [...prevGoods, data]);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleName = useCallback((e) => setName(e.target.value), []);
  const handleIdNumber = useCallback((e) => setIdNumber(e.target.value), []);
  const handlePrice = useCallback((e) => setPrice(e.target.value), []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`form-group row ${styles.Container}`}>
          <input
            type="text"
            value={name}
            onChange={handleName}
            name="name"
            placeholder="Name..."
          />
          <input
            type="text"
            value={idNumber}
            onChange={handleIdNumber}
            name="identityNumber"
            placeholder="number..."
          />
          <input
            type="text"
            value={price}
            onChange={handlePrice}
            name="value"
            placeholder="Price..."
          />
          <select className="form-control" data-val="true" name="storeId">
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </div>
      </form>
      <table id="employees">
        <tbody>
          <tr>
            <th>Good Name</th>
            <th>Good Number</th>
            <th>Good Price</th>
          </tr>
          {goods.map((good) => (
            <tr key={good.id}>
              <td>{good.name}</td>
              <td>{good.identityNumber}</td>
              <td>{good.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CreateGood;
