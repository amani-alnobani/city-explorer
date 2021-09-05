import React, { Component } from 'react'
import axios from 'axios';


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationData: {}
    }
  }

  handelLocationNameChange = (e) => { this.setState({ locationName: e.target.value }) }

  handelSubmit = async (e) => {
    e.preventDefault();
    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;

    console.log(url);

    const response = await axios.get(url);
    this.setState({
      locationData: response.data[0]
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handelSubmit}>
          <input type="text" onChange={this.handelLocationNameChange} placeholder="enter city name" />
          <input type="submit" value="Explorer!" />
        </form>

        <div>
          <h2>Location Info</h2>
          <p>{this.state.locationData.display_name}</p>
          <p>lat: {this.state.locationData.lat}</p>
          <p>lon: {this.state.locationData.lon}</p>
        </div>
      </div>
    )
  }
}

export default App

