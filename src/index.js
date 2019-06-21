import React, { Component } from "react";
import ReactDOM from "react-dom";
import ThankYou from "./components/ThankYou.js";
import WePayDropZone from "./components/WePayDropZone.js";
import "./styles.css";
import Intro from "./components/Intro.js";

//   WePayDocUploads   (legal_entity_id, isReady, isComplete, Files[], tokens)
//   - Intro
//   - WePayDropZone  (Files[], isFileTooLarge)
//     -DocumentList
//        -DocumentItem
//   - ThankYou

class WePayDocUploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legal_entity_id: "0074c262-10a9-4e99-ad54-7aaec3b373c2",
      account_id: "30963cc8-65f7-4582-80bb-3ddf3c6024fd",
      isReady: false,
      isComplete: false,
      files: [],
      tokens: []
    };
    this.NewFiles = this.NewFiles.bind(this);
    this.Ready = this.Ready.bind(this);
    this.Upload = this.Upload.bind(this);
  }

  NewFiles(files) {
    this.setState({ files: files });
  }

  Ready(ready) {
    this.setState({ isReady: ready });
  }

  Upload() {
    const wp = window.WePay;
    wp.configure("stage", "37778", "3.0");
    this.state.files.forEach(file => {
      const headers = {};
      const body = {
        type: file.type,
        legal_entity_id: this.state.legal_entity_id,
        //account_id: this.state.account_id,
        file: file.path
      };
      try {
        wp.documents.create(body, headers, response => {
          console.log(response.id);
          this.setState(() => ({
            tokens: [...this.state.tokens, response.id]
          }));
        });
      } catch (e) {
        console.log(e);
      }
    });
    this.setState({ isReady: false, isComplete: true, files: [] });
  }

  render() {
    if (!this.state.isComplete) {
      return (
        <div className="container">
          <Intro />
          <WePayDropZone
            maxSize={1000000}
            accept="image/jpeg, image/png, application/pdf"
            onNewFiles={this.NewFiles}
            onReady={this.Ready}
          />
          <button
            className="SubmitButton"
            disabled={!this.state.isReady}
            onClick={this.Upload}
          >
            Ready for Verification
          </button>
        </div>
      );
    } else {
      return <ThankYou />;
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<WePayDocUploads />, rootElement);
