import './App.css';
import Header from './components/Header';
import VisitorLogger from './components/VisitorLogger';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterConfig from './routes/Router';

function App() {
  return (
    <Router>
      <VisitorLogger />
      <Header />
      <main className="mt-16">
        <RouterConfig />
      </main>
    </Router>
  );
}

export default App;
