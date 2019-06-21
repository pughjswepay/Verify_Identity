import React, { Component } from "react";
import Dropzone from "react-dropzone";
import DocumentList from "./DocumentList";
import "./../styles.css";

class WePayDropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      isFileTooLarge: false
    };
  }

  goodDocs = files => {
    files.forEach((file, index) => {
      this.setState(() => ({
        files: [...this.state.files, { path: files[index] }]
      }));
    });
    this.props.onReady(false);
  };

  badDocs = files => {
    const isFileTooLarge =
      files.length > 0 && files[0].size > this.props.maxSize;
    this.setState({ isFileTooLarge: isFileTooLarge });
  };

  render() {
    return (
      <Dropzone
        onDropAccepted={this.goodDocs}
        onDropRejected={this.badDocs}
        accept={this.props.accept}
        maxSize={this.props.maxSize}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
          let goodDocReady = isDragActive && !isDragReject;
          function DropZoneStyle() {
            if (isDragReject) return "DropZoneReject";
            else return goodDocReady ? "DropZoneReady" : "DropZone";
          }
          return (
            <section>
              <div {...getRootProps()} className={DropZoneStyle()}>
                <input {...getInputProps()} />
                <div>
                  {!isDragActive && "Click here or drop a file to upload"}
                  {goodDocReady && "Drop it like it's hot!"}
                  {isDragReject && (
                    <span>Only images or PDFs can be accepted</span>
                  )}
                  {this.state.isFileTooLarge && (
                    <div className="ProblemWithFile">
                      File must be less than 10MB
                    </div>
                  )}
                </div>
                <em>
                  (Only *.jpeg, *.jpg, *.png or *.pdf images less than{" "}
                  {(this.props.maxSize / 100000).toFixed(0)}MB will be accepted)
                </em>
              </div>
              <DocumentList
                onNewFiles={this.props.onNewFiles}
                onReady={this.props.onReady}
                filemap={this.state.files}
              />
            </section>
          );
        }}
      </Dropzone>
    );
  }
}

export default WePayDropZone;
