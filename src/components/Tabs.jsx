/*Toggle between all calls and archived calls*/

import React, { Component } from "react";

import { Link } from "react-router-dom";

import "../css/tabs.css"

class Tabs extends Component {
  render() {
    return (
      <div className="tabs-container">
        <Link to="/" >ALL</Link>
        <Link to="/archived">ARCHIVED</Link>
      </div>
    );
  }
}



export default Tabs;
