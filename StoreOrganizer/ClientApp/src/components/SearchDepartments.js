import React, { useState, useCallback, useEffect } from "react";
import styles from "./Components.module.css";
import "./components.css";

const SearchDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [stores, setStores] = useState([]);

  const getDepartments = useCallback(() => {
    fetch("weatherforecast/getdepartments")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
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
    getDepartments();
    getStores();
  }, [getDepartments, getStores]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      fetch("weatherforecast/getstoredepartments", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setDepartments(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`form-group row ${styles.Container}`}>
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
            <th>Name</th>
            <th>Store Number</th>
          </tr>
          {departments.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.departmentNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SearchDepartments;
