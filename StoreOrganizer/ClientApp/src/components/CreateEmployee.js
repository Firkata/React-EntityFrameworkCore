import React, { useState, useCallback, useEffect } from "react";
import styles from "./Components.module.css";
import "./components.css";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [empNumber, setEmpNumber] = useState("");
  const [salary, setSalary] = useState("");
  const [title, setTitle] = useState("");
  const [empDepartment, setEmpDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const getEmployees = useCallback(() => {
    fetch("weatherforecast/getemployees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);

  const getDepartments = useCallback(() => {
    fetch("weatherforecast/getdepartments")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDepartments(data);
      });
  }, []);

  useEffect(() => {
    getEmployees();
    getDepartments();
  }, [getEmployees, getDepartments]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      fetch("weatherforecast/createemployee", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployees((prevEmployees) => [...prevEmployees, data]);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleName = useCallback((e) => setName(e.target.value), []);
  const handleEmpNumber = useCallback((e) => setEmpNumber(e.target.value), []);
  const handleSalary = useCallback((e) => setSalary(e.target.value), []);
  const handleTitle = useCallback((e) => setTitle(e.target.value), []);
  const handleDepartment = useCallback(
    (e) => setEmpDepartment(e.target.value),
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
            value={empNumber}
            onChange={handleEmpNumber}
            name="identityNumber"
            placeholder="Employee number..."
          />
          <input
            type="text"
            value={salary}
            onChange={handleSalary}
            name="salary"
            placeholder="Salary"
          />
          <input
            type="text"
            value={title}
            onChange={handleTitle}
            name="title"
            placeholder="Position..."
          />
          <select
            className="form-control"
            data-val="true"
            name="departmentId"
            onChange={handleDepartment}
          >
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
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
            <th>Id Number</th>
            <th>Salary</th>
            <th>Title</th>
          </tr>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.identityNumber}</td>
              <td>{employee.salary}</td>
              <td>{employee.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CreateEmployee;
