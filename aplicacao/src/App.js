import { Component } from 'react';
import './App.css';

class App extends Component{ // componente de classe
  state = {
      name: 'Luisao',
      counter: 0
    };

  
  
  handlePClick = () =>{

    this.setState({name:'Guilherme'}, console.log(`nome mudado para Guilherme`));
  }

  handleAClick = (event) => {
    //event.preventDefault();
    const {counter}  = this.state;
    this.setState({counter: counter + 1});

  }

  render(){ // método

    const { name, counter } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p onClick={this.handlePClick}>
            {name} say Hello {":)  !"}
            <br></br>
            {counter}
          </p>
          <a  
            onClick={this.handleAClick}
            className="App-link"
            href="https://www.luisaodev.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn
          </a>
        </header>
      </div>
    );
  }
}

export default App;
