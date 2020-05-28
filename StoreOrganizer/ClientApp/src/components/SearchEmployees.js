import React, { useState, useCallback, useEffect } from "react";
import styles from "./Components.module.css";
import "./components.css";

const SearchEmployees = () => {
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
      fetch("weatherforecast/getdepartmentemployees", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployees(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`form-group row ${styles.Container}`}>
          <select className="form-control" data-val="true" name="departmentId">
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

export default SearchEmployees;
