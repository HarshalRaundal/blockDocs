
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { LogIn } from './screens/LogIn';
import { About } from './screens/About';
import Issue from './screens/Issue';
import { Account } from './screens/Account';
import Contact from './screens/Contact';


function App() {
  return (
    <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/LogIn" element={<LogIn />} />
              <Route exact path="/about" element={<About />} />  
              <Route exact path="/contact" element={<Contact />} />  
              <Route exact path="/issue" element={<Issue />} />    
              <Route exact path="/account" element={<Account />} />              
            </Routes>
          </div>
        </Router>
  );
}

export default App;
