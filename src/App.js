import React from 'react';
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Header from './comp/Header';
import Footer from './comp/Footer';
import CategoriesUI from './pages/CategoriesUI';
import SpotlightUI from './pages/SpotlightUI';
import CartUI from './pages/CartUI';
import MapUI from './pages/MapUI';
import ArticleUI from './pages/ArticleUI';
import ArticleList from './pages/ArticleList';

function App() {
    return (
      <HashRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<><Header title={"Spotlight"}/><SpotlightUI/></>}/>
            <Route path="/categories" element={<><Header title={"Kategorien"}/><CategoriesUI/></>}/>
            <Route path="/categories/:categoryId" element={<><Header title={"Kategorien"}/><CategoriesUI/></>}/>
            <Route path="/categories/:categoryId/articles" element={<><Header title={"Artikel"}/><ArticleList/></>}/>
            <Route path="/cart" element={<><Header title={"Warenkorb"}/><CartUI/></>}/>
            <Route path="/map" element={<><Header title={"Umgebung"}/><MapUI/></>}/>
            <Route path="/article" element={<><Header title={"Artikel"}/><ArticleUI/></>}/>
          </Routes>
          <Footer/>
        </div>
      </HashRouter>
    );
}

export default App;
