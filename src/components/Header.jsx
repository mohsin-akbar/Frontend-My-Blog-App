import { Link, NavLink as ReactLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';
import { doLogout, getCurrentUser, isLoggedIn } from './authentication/securityauth';

function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  let navigate = useNavigate()

  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    setLogin(isLoggedIn())
    setUser(getCurrentUser())
  }, [login])


  //method for logout
  const logout = () => {
    doLogout(() => {
      setLogin(false);

      //navigate
      navigate("/")


    })
  }

  {
    console.log(user)
  }

  return (
    <div >
      <Navbar {...args} color="dark" dark >
        <NavbarBrand>
          <img
            alt="logo"
            className='rounded-circle'
            src="https://e7.pngegg.com/pngimages/499/940/png-clipart-computer-icons-blogger-logo-others-miscellaneous-text-thumbnail.png"
            style={{
              height: 30,
              width: 30
            }}
          />Post your Blog</NavbarBrand>
        {
          login && (
            <Link style={{ color: 'white', textDecoration: 'none', marginRight: 'auto' }} tag="a" to="/private/post">  <Button
              color="light"
              size='sm'
              outline
            >
              Post <Spinner

                color="light"
                size="sm"
                type="grow"
              >
                Loading...
              </Spinner>
            </Button></Link>
          )
        }

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>

            {

              login && (
                <>
                  <NavItem>
                    <NavLink onClick={logout} >Logout</NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink tag={ReactLink} to={"/private/user-profile/"+user.username} >{user.username}</NavLink>
                  </NavItem>
                </>
              )

            }
            {
              !login && (
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/signin">
                      SignIn
                    </NavLink>
                    <NavLink tag={ReactLink} to="/signup">
                      SignUp
                    </NavLink>
                  </NavItem>
                </>
              )
            }

            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/service">Services</DropdownItem>
                <DropdownItem>Play With Java</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
                <DropdownItem>you can add anything</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink tag={ReactLink} to="/private/user">Dashboard</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>youtube</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;