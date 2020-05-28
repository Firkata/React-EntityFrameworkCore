import React, { useState, useCallback, useEffect } from "react";
import styles from "./Components.module.css";
import "./components.css";

const CreateStore = () => {
  const [name, setName] = useState("");
  const [storeNumber, setStoreNumber] = useState("");
  const [stores, setStores] = useState([]);

  const getEmployees = useCallback(() => {
    fetch("weatherforecast/getstores")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStores(data);
      });
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      fetch("weatherforecast/createstore", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setStores((prevStores) => [...prevStores, data]);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleName = useCallback((e) => setName(e.target.value), []);
  const handleStoreNumber = useCallback(
    (e) => setStoreNumber(e.target.value),
    []
  );

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
            value={storeNumber}
            onChange={handleStoreNumber}
            name="storeNumber"
            placeholder="Store number..."
          />
          <input type="submit" value="Submit" />
        </div>
      </form>

      <table id="employees">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Id Number</th>
          </tr>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.storeNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CreateStore;
