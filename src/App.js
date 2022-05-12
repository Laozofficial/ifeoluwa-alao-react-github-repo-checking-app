import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is an app written by Ifeoluwa Alao Ojo
          <br />
          <br />
          Phone Number : +2349098311785
          <br />
          <br />
          Email  : Laozofficial@gmail.com
        </p>
        <Link to="/home">Proceed to Get All Repos</Link>
      </header>
    </div>
  );
}

export default App;
