import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
    console.log("Going to create component");
  }

  storeNameInput = React.createRef();

  // Method is declared as a property on the component set to an arrow function
  goToStore = event => {
    event.preventDefault();

    const storeName = this.storeNameInput.current.value;

    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2> Please Enter a Store</h2>
        <input
          type="text"
          required
          placeholder="Enter store name"
          defaultValue={getFunName()}
          ref={this.storeNameInput}
        />

        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
