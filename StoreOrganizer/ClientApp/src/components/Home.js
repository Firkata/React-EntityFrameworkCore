import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <p>
          This is a project aimed to demonstrate how to work Entity Framework
          Core and React.
        </p>
        <p>The folowing are included:</p>

        <ul>
          <li>Forms for creating data.</li>
          <li>Forms for searching data.</li>
          <li>Table Views of data.</li>
          <li>PDF exporter</li>
        </ul>
      </div>
    );
  }
}
