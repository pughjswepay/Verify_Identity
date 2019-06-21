import React, { Component } from "react";
import DocumentItem from "./DocumentItem";
import "./../styles.css";

class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.TypeSelected = this.TypeSelected.bind(this);
  }

  TypeSelected = (selectedIndex, selectedType) => {
    let updatedFiles = this.props.filemap;
    updatedFiles[selectedIndex]["type"] = selectedType;
    let ready = false;
    for (let index in updatedFiles)
      ready = updatedFiles[index].type !== undefined;

    if (ready) {
      this.props.onReady(ready);
      this.props.onNewFiles(updatedFiles);
    }
  };

  render() {
    let files = this.props.filemap;
    let doclist = files.map((file, index) => (
      <DocumentItem
        file={file.path}
        key={index}
        index={index}
        onChange={this.TypeSelected}
      />
    ));
    return <aside className="DocumentList">{doclist}</aside>;
  }
}
export default DocumentList;
