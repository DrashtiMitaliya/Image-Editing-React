import './App.css';
import MainComponent from './Components/MainComponent';
import { Provider } from 'react-redux';
import  {store}  from './Redux/Store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <MainComponent />
      </Provider>
    </div>
  );
}

export default App;
