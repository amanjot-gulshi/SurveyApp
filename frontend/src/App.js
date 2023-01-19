import React from 'react';
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import SurveyScreen from './screens/SurveysScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import SingleSurveyScreen from './screens/SingleSurveyScreen'
import CreateSurveyScreen from './screens/CreateSurveyScreen';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProfileScreen from './screens/ProfileScreen';

function App() {

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/my-surveys" element={<HomeScreen />} />
            <Route path="/surveys" element={<SurveyScreen />} />
            <Route path="/surveys/:id/:title" element={<SingleSurveyScreen />} />
            <Route path="/create" element={<CreateSurveyScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>

  );
}


export default App;
