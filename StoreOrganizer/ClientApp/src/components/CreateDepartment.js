import React, { useState, useCallback, useEffect } from "react";
import styles from "./Components.module.css";
import "./components.css";

const CreateDepartment = () => {
  const [name, setName] = useState("");
  const [depNumber, setDepNumber] = useState("");
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
      fetch("weatherforecast/createdepartment", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setDepartments((prevDeps) => [...prevDeps, data]);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleName = useCallback((e) => setName(e.target.value), []);
  const handleEmpNumber = useCallback((e) => setDepNumber(e.target.value), []);

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
            value={depNumber}
            onChange={handleEmpNumber}
            name="departmentNumber"
            placeholder="Department number..."
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
            <th>Department Name</th>
            <th>Department Number</th>
          </tr>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>{department.departmentNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CreateDepartment;
