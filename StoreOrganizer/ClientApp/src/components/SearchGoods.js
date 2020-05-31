import React, { useState, useCallback, useEffect } from "react";
import formStyles from "./Components.module.css";
import "./components.css";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const SearchDepartments = () => {
  const [goods, setGoods] = useState([]);
  const [stores, setStores] = useState([]);

  const getGoods = useCallback(() => {
    fetch("weatherforecast/getgoods")
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
      fetch("weatherforecast/getstoregoods", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setGoods(data);
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
      <div>.</div>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Name:</Text>
                {goods.map((good) => (
                  <Text>{good.name}</Text>
                ))}
              </View>
              <View style={styles.section}>
                <Text>Number:</Text>
                {goods.map((good) => (
                  <Text>{good.identityNumber}</Text>
                ))}
              </View>
              <View style={styles.section}>
                <Text>Value:</Text>
                {goods.map((good) => (
                  <Text>{good.value}</Text>
                ))}
              </View>
            </Page>
          </Document>
        }
        fileName="goods.pdf"
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
