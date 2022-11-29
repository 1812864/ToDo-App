import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './components/pages/HomePage.js';
import Todo from './components/pages/CreateTodo.js';
import ElementPage from './components/pages/ElementPage';
import Category from './components/pages/Category';
import CreateTodo from './components/pages/CreateTodo'
export default class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/category" element={<Category />} />
          {/* <Route path="/createTodo" element={<CreateTodo />} /> */}
        </Routes>
      </Layout>
    );
  }
}
