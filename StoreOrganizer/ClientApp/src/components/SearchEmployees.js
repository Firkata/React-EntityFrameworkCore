import React, { useState, useCallback, useEffect } from "react";
import formStyles from "./Components.module.css";
import "./components.css";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

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

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`form-group row ${formStyles.Container}`}>
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
      <div>.</div>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Name:</Text>
                {employees.map((employee) => (
                  <Text>{employee.name}</Text>
                ))}
              </View>
              <View style={styles.section}>
                <Text>Number:</Text>
                {employees.map((employee) => (
                  <Text>{employee.identityNumber}</Text>
                ))}
              </View>
              <View style={styles.section}>
                <Text>Salary:</Text>
                {employees.map((employee) => (
                  <Text>{employee.salary}</Text>
                ))}
              </View>
              <View style={styles.section}>
                <Text>Title:</Text>
                {employees.map((employee) => (
                  <Text>{employee.title}</Text>
                ))}
              </View>
            </Page>
          </Document>
        }
        fileName="employees.pdf"
        style={{
          textDecoration: "none",
          padding: "10px",
          color: "#4a4a4a",
          backgroundColor: "#f2f2f2",
          border: "1px solid #4a4a4a",
        }}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Pdf"
        }
      </PDFDownloadLink>
    </>
  );
};

export default SearchEmployees;
