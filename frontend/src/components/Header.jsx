import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom';

import React from 'react';

function Header() {

    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/surveys')
    }


    return (

        <header className="header">
            <Navbar fixed='top'>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            <Navbar.Brand>SurveyApp</Navbar.Brand>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/surveys">Surveys</Nav.Link>
                            {userInfo ? (

                                <NavDropdown title={userInfo.first_name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/create'>
                                        <NavDropdown.Item>Create</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>

                            ) : (
                                <div>
                                    <NavDropdown title="Account" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>

    );
}

export default Header;