import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListTeamComponent from './components/ListTeamComponent';
import QBPredictionsComponent from './components/QBPredictionsComponent';
import FieldForm from './components/TestComponent';
import Test from './components/TestComponent2';

function App() {
  const fields = ["field1", "field2", "field3", "anotherField"];
  return (
    <div>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<ListTeamComponent/>}></Route>
            <Route path="/list-teams" element={<ListTeamComponent/>}></Route>
            <Route path="/qb-predictions" element={<QBPredictionsComponent/>}></Route>
            <Route path="/test" element={<FieldForm fields={fields}/>}></Route>
            <Route path="/test2" element={<Test fields={fields}/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;