import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import SurveyScreen from './screens/SurveysScreen'
import AboutScreen from './screens/AboutScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import SingleSurveyScreen from './screens/SingleSurveyScreen'
import CreateSurveyScreen from './screens/CreateSurveyScreen';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/surveys" element={<SurveyScreen />} />
            <Route path="/surveys/:id" element={<SingleSurveyScreen />} />
            <Route path="/create" element={<CreateSurveyScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>

  );
}


export default App;
