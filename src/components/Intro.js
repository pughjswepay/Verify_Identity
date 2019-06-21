import React, { Component } from "react";
import "./../styles.css";

class Intro extends Component {
  render() {
    let title = this.props.isDispute
      ? "Challenge the Dispute"
      : "Verify Your Identity";
    let message = this.props.isDispute
      ? "Please upload images to help challenge your dispute"
      : "To verify your identity please upload a image of your Driving License, or Passport.";
    return (
      <div>
        <h1>{title}</h1>
        <p className="Intro">{message}</p>
      </div>
    );
  }
}

export default Intro;
