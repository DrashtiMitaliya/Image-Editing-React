import './App.css';
import MainComponent from './Components/MainComponent';
import { Provider } from 'react-redux';
import store from './Redux/Store'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <MainComponent />
      <Toaster/>
      </Provider>
    </div>
  );
}

export default App;
