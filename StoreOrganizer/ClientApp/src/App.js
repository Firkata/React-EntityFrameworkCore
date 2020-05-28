import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";

import "./custom.css";
import CreateEmployee from "./components/CreateEmployee";
import CreateDepartment from "./components/CreateDepartment";
import SearchEmployees from "./components/SearchEmployees";
import CreateStore from "./components/CreateStore";
import SearchDepartments from "./components/SearchDepartments";
import SearchGoods from "./components/SearchGoods";
import CreateGood from "./components/CreateGood";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/employees" component={CreateEmployee} />
        <Route path="/departments" component={CreateDepartment} />
        <Route path="/stores" component={CreateStore} />
        <Route path="/goods" component={CreateGood} />
        <Route path="/searchemployees" component={SearchEmployees} />
        <Route path="/searchdepartments" component={SearchDepartments} />
        <Route path="/searchgoods" component={SearchGoods} />
      </Layout>
    );
  }
}
