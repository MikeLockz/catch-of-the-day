import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from "./Fish"
import base from "../base"

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = (fish) => {
    // take copy of existing state
    const fishes = { ...this.state.fishes }
    // add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish
    // set new fishes object to state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState( { fishes } )
  }

  addToOrder = (key) => {
    // take copy of existing state
    const order = {...this.state.order}
    // either add new fish to order, or increment count of existing fish in order
    order[key] = order[key]+1 || 1
    // set new order object to state
    this.setState({ order })
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes})
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
                key={key} 
                index={key}
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        
        <Order order={this.state.order} fishes={this.state.fishes} />

        <Inventory 
          addFish={this.addFish} 
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish} />
      </div>
    )
  }
}

export default App