import React from 'react'
import { formatPrice } from "../helpers"

class Fish extends React.Component {
  handleClick = () => {
    
  }

  render() {
    const {image, name, desc, price, status } = this.props.details
    const isAvailable = status === 'available'

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="fish-price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button onClick={() => this.props.addToOrder(this.props.index)} disabled={!isAvailable}>{isAvailable ? 'Add to Cart': 'Sold Out'}</button>
      </li>
    )
  }
}

export default Fish
