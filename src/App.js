import './App.css';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css'
import image from './images/hexagon-logo_final.png'

function App() {
  return (
    <>
    <table class="table">
      <tr class="App"><td id="heading">Demo Server Information Test</td><td id="img"> <img src={image} id="logo"/></td></tr>
    </table>
    
    <Main/>
    </>
  );
}

export default App;
