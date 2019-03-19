import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
const app = new Clarifai.App({
 apiKey: '5a756dd3f68343958546cd4db3b65ae9'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSigned: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
      this.state.input).then(response => this.displayBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({ isSigned: false });
    }else if(route === 'home'){
      this.setState({ isSigned: true });
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={ this.onRouteChange } isSigned={this.state.isSigned}/>
        { this.state.route === 'home' ? 
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <Particles className='particles' params={{
                    particles: {
                      line_linked: {
                        shadow: {
                          enable: true,
                          color: "#3CA9D1",
                          blur: 5
                        }
                      },
                      number: {
                        value: 50,
                        density: {
                          enable: true,
                          value_area: 800
                        }
                      }
                    }
                  }} />
            <FaceRecognition imageUrl={ this.state.imageUrl } box={ this.state.box }/>
          </div>
          : (
            this.state.route === 'signin' ?
              <Signin onRouteChange={ this.onRouteChange } />
            : 
              <Register onRouteChange={ this.onRouteChange } />
          )
        }
      </div>
    );
  }
}

export default App;
