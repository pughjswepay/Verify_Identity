import React, { Component } from "react";
import "./../styles.css";

class DocumentItem extends Component {
  constructor(props) {
    super(props);
    this.DocType = this.DocType.bind(this);
  }

  DocType(e) {
    this.props.onChange(this.props.index, e.target.value);
  }

  render() {
    let file = this.props.file;
    return (
      <div key={file.path} className="DocListItem">
        <select defaultValue="noSel" onChange={this.DocType}>
          <option value="noSel" disabled>
            Select a document types
          </option>
          <option value="passport">Passport</option>
          <option value="drivers_license">Driving License</option>
        </select>
        {" for " + file.path}
      </div>
    );
  }
}

export default DocumentItem;
