import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListTeamComponent from './components/ListTeamComponent';
import QBPredictionsComponent from './components/QBPredictionsComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<ListTeamComponent/>}></Route>
            <Route path="/list-teams" element={<ListTeamComponent/>}></Route>
            <Route path="/qb-predictions" element={<QBPredictionsComponent/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;