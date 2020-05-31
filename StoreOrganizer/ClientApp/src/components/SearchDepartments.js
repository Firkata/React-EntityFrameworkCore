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
      <div>.</div>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Name:</Text>
                {departments.map((department) => (
                  <Text>{department.name}</Text>
                ))}
              </View>
              <View style={styles.section}>
                <Text>Number:</Text>
                {departments.map((department) => (
                  <Text>{department.departmentNumber}</Text>
                ))}
              </View>
            </Page>
          </Document>
        }
        fileName="departments.pdf"
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

export default SearchDepartments;
