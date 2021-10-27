/*Show all the archived calls from API */

import React, { Component } from "react";
/*Component imports */
import Header from "../Header.jsx";
import Tabs from "./Tabs.jsx";
import Loading from "./Loading.jsx"
import axios from "axios";

import { Link } from "react-router-dom";

/*React icons*/
import { BsTelephoneFill } from "react-icons/bs";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

import "../css/achivedCalls.css";

const getAllCallersURL = "https://aircall-job.herokuapp.com/activities";

class ArchivedCalls extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get(getAllCallersURL).then((response) => {
      const data = response.data;

      let list = data.filter((caller) => caller.is_archived === true);

      this.setState({ list: list, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <Header />
          <div className="container-view">
            <Tabs />
            <p className="archived-title">Archived Calls</p>
            <Loading />
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <Header />
        <div className="container-view">
          <Tabs />
          <p className="archived-title">Archived Calls</p>
          {this.state.list.map((caller, id) => {
            return (
              <div key={id} className="caller-container">
                <Link to={`/caller/${caller.id}`} className="caller-links">
                  <div className="caller-wrapper">
                    <div className="caller-icon-wrapper">
                      {caller.direction === "outbound" ? (
                        <FaLongArrowAltRight className="icon-outbound" />
                      ) : (
                        <FaLongArrowAltLeft className="icon-inbound" />
                      )}
                      <BsTelephoneFill className="icon-phone" />
                    </div>

                    <div className="caller-info-wrapper">
                      <div>
                        <p>
                          {caller.direction === "outbound"
                            ? `${caller.from} `
                            : `${caller.to}`}
                        </p>
                      </div>
                      <div>
                        <p>
                          {caller.direction === "outbound"
                            ? `${caller.to} `
                            : `${caller.from}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ArchivedCalls;
