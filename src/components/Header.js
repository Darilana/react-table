import React from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

const Header = () => (
    <Navbar inverse collapseOnSelect className="nav">
        <Navbar.Header>
            <Navbar.Brand><IndexLinkContainer to='/'>
                <NavItem>
                    <span className='glyphicon glyphicon-home'></span>
                </NavItem>
            </IndexLinkContainer></Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <LinkContainer to ="/table">
                    <NavItem>Table</NavItem>
                </LinkContainer>
                <LinkContainer to ="/aboutUs">
                    <NavItem>About Us</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;