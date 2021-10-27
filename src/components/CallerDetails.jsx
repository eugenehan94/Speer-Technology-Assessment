/*Specific calls when user chooses one of the Activity Feed

Because of react version, I can't use useParams to get the id
but I could pass the component as a prop from the Router
*/

import React, { Component } from "react";
import Header from "../Header.jsx";
import Tabs from "./Tabs.jsx";
import Loading from "./Loading.jsx"
import axios from "axios";

import "../css/callerDetails.css";

import { BsPersonCircle } from "react-icons/bs";
import { FaPhoneSquareAlt } from "react-icons/fa";

const getSingleCallerURL = "https://aircall-job.herokuapp.com/activities/";
const postArchiveCallerURL = "https://aircall-job.herokuapp.com/activities/";

class CallerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caller: {},
      loading: true,
    };
  }

  componentDidMount() {
    const callerID = this.props.match.params.id;
    axios.get(getSingleCallerURL + `${callerID}`).then((response) => {
      const result = response.data;
      this.setState({ caller: result, loading: false });
    });
  }

  handleClick(id, is_archived) {
    if (is_archived === false) {
      axios
        .post(postArchiveCallerURL + `${id}`, {
          is_archived: true,
        })
        .then(() => window.location.reload(false));
      return;
    } else {
      axios
        .post(postArchiveCallerURL + `${id}`, {
          is_archived: false,
        })
        .then(() => window.location.reload(false));

      return;
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <Header />
          <div className="container-view">
            <Tabs />
            <p className="caller-detail-title">Caller Details</p>
            <Loading/>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <Header />
        <div className="container-view">
          <Tabs />
          <p className="caller-detail-title">Caller Details</p>
          <div className="caller-content-wrapper">
            <div>
              <BsPersonCircle className="caller-avatar" />
            </div>
            <div>
              {this.state.caller.direction === "outbound"
                ? `${this.state.caller.from} `
                : `${this.state.caller.to}`}
            </div>
            <div>
              {this.state.caller.direction === "outbound"
                ? `${this.state.caller.to} `
                : `${this.state.caller.from}`}
            </div>
            <button
              className="archive-button"
              onClick={() =>
                this.handleClick(
                  this.state.caller.id,
                  this.state.caller.is_archived
                )
              }
            >
              {this.state.caller.is_archived === false
                ? "Archive"
                : "Unarchive"}
            </button>
          </div>
          <div className="call-log-container">
            <div>
              <FaPhoneSquareAlt  className="call-log-icon"/>
            </div>
            <div>
                  <div><p>{this.state.caller.created_at}</p></div>
                  <div><p>{this.state.caller.call_type}</p></div>
                  <div><p>{this.state.caller.duration} seconds</p></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CallerDetails;
