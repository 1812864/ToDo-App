import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import CreateTodo from './pages/CreateTodo';
import Category from './pages/Category';
import { Button } from 'semantic-ui-react';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand ><NavLink tag={Link} className="text-dark" to="/Home">Home</NavLink></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <CreateTodo onCreate={this.props.onCreate} />
              <Button as={Link} to="/category" >Category</Button>
              {/* <Button as={Link} to="/createTodo" onCreate={this.props.onCreate}>CreateTodo</Button> */}
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
