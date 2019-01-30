import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFish: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    // When the page reloads, check user on firebase
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // Look up current store in firebase db
    const store = await base.fetch(this.props.storeId, { context: this });

    // claim if no owner (first person to access)
    if (!store.owner) {
      // save current user as owner
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    // set state of inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
  };

  render() {
    const logout = <button onClick={this.logout}>Logout</button>;
    // 1. Check if user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if user is not owner of store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <h1>Sorry you are not the owner of this store.</h1>
          {logout}
        </div>
      );
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}

        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            fish={this.props.fishes[key]}
            key={key}
            index={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}

        <AddFishForm addFish={this.props.addFish} />

        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
