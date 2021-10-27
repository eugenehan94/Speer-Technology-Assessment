/*REMINDER: BASED ON REACT VERSION, DON'T USE HOOKS
 1) fetch(GET) all the calls from the given API - Given in an array of objects.
2) Display details - show out/in bound, name, number

*/
import React, { Component } from "react";
import axios from "axios";

import Header from "../Header.jsx";
import Tabs from "./Tabs.jsx";
import Loading from "./Loading.jsx";
/*React router - to select individual callers*/
import { Link } from "react-router-dom";

/*React icons*/
import { BsTelephoneFill } from "react-icons/bs";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

/*CSS import */
import "../css/feeds.css";
import "../css/activityFeed.css";
const getAllCallersURL = "https://aircall-job.herokuapp.com/activities";

class ActivityFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get(getAllCallersURL).then((response) => {
      const data = response.data;
      let list = data.filter((caller) => caller.is_archived === false);
      this.setState({ list, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <Header />
          <div className="container-view">
            <Tabs />
            <p className="activity-title">All Calls</p>
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
          <p className="activity-title">All Calls</p>
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

export default ActivityFeed;
