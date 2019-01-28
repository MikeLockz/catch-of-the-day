import React from 'react'

class EditFishForm extends React.Component {
  handleChange = (event) => {
    // 1 - copy fish
    const updatedFish = { 
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    }

    this.props.updateFish(this.props.index, updatedFish)
  }

  render() {
    return (
      <div className="fish-edit">
        <input type="text" name="name" value={this.props.fish.name} onChange={this.handleChange} />
        <input type="text" name="price" value={this.props.fish.price} onChange={this.handleChange} />
        <select type="text" name="status" value={this.props.fish.status} onChange={this.handleChange}>
          <option value="unavailable">Fresh</option>
          <option value="available">Sold Out!</option>
        </select>
        <textarea name="desc" value={this.props.fish.desc} onChange={this.handleChange} />
        <input type="text" name="image" value={this.props.fish.image} onChange={this.handleChange} />
      </div>
    )
  }
}

export default EditFishForm