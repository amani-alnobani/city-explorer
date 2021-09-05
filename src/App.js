import React, { Component } from 'react'
import axios from 'axios';


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      theLocationData: {}
    }
  }

  handelLocationNameChange = (e) => { this.setState({ locationName: e.target.value }) }

  handelSubmit = async (e) => {
    e.preventDefault();
    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;

    const responseOperation = await axios.get(url);
    this.setState({
      theLocationData: responseOperation.data[0]
    });
  }

  render() {
    const styling = {
      backgroundcolor: "white",
      fontfamily: "Arial",
      color: "blue",
      margin:"20px"
    }


    return (
      <div>
        <form style={styling} onSubmit={this.handelSubmit}>
          <input type="text" onChange={this.handelLocationNameChange} placeholder="enter city name" />
          <input type="submit" value="Explorer!" />
        </form>
        <div>
        <h2 style={{color:"darkcyan" , margin:"20px 20px 20px 20px"}}>Location Info</h2>
        <p style={{color:"darkgoldenrod", margin:"20px 20px 20px 20px"}}>{this.state.theLocationData.display_name}</p>
        <p style={{color:"darkgoldenrod", margin:"20px 20px 20px 20px"}}>lat: {this.state.theLocationData.lat}</p>
        <p style={{color:"darkgoldenrod", margin:"20px 20px 20px 20px"}}>lon: {this.state.theLocationData.lon}</p>
        <img style={{margin:"20px 20px 20px 20px"}} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.theLocationData.lat},${this.state.theLocationData.lon}&zoom=1-18`} alt="" />
      </div>
      </div>
    )
  }
}

export default App

