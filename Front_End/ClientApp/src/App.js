import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './components/pages/HomePage.js';
import ElementPage from './components/pages/ElementPage';
import Category from './components/pages/Category';
import TodoPage from './components/pages/ToDoPage';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/element" element={<ElementPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </Layout>
    );
  }
}

