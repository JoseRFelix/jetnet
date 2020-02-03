import React from "react";
import styled from "styled-components";
import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "slices/modal";
import { modalTypes, routes } from "../constants";
import { logout } from "slices/auth";
import { clearUser } from "slices/user";
import { useHistory } from "react-router-dom";
import { RootState } from "slices";

interface Props {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const { push } = useHistory();

  const openSignIn = () => {
    dispatch(showModal({ modalType: modalTypes.signIn, modalProps: {} }));
  };

  const openSignUp = () => {
    dispatch(showModal({ modalType: modalTypes.signUp, modalProps: {} }));
  };

  if (isLoggedIn) {
    return (
      <Wrapper>
        <Logo onClick={() => push(routes.Landing)}>Jetnet</Logo>
        <AuthBox>
          <Link>Find People</Link>
          <Link>Messages</Link>
          <Link>My Contacts</Link>
          <Logout
            onClick={() => {
              dispatch(logout());
              dispatch(clearUser());
            }}
          >
            Logout
          </Logout>
          <UserAvatar src={user.picture ? user.picture : undefined} />
        </AuthBox>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Logo onClick={() => push(routes.Landing)}>Jetnet</Logo>
      <LinksBox>
        <Link>Home</Link>
        <Link>About Us</Link>
        <Link>Features</Link>
        <Link>Resources</Link>
      </LinksBox>
      <AuthBox>
        <AuthLogIn onClick={openSignIn}>Log In</AuthLogIn>
        <Button onClick={openSignUp}>Sign Up</Button>
      </AuthBox>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 3rem 0rem;
`;

const Logo = styled.h1`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 2.3rem;
  letter-spacing: 2px;
`;

const LinksBox = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 4rem;
  }
`;

const Link = styled.span`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;

const AuthBox = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 2rem;
  }
`;

const AuthLogIn = styled.p`
  font-weight: 600;
  font-size: 1.5rem;

  cursor: pointer;

  transition: transform 0.2s ease-out;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserAvatar = styled.img`
  width: 4rem;
  height: 4rem;

  border: none;

  border-radius: 50%;

  background-color: grey;
`;

const Logout = styled.p`
  font-weight: 600;
  font-size: 1.5rem;

  cursor: pointer;

  transition: transform 0.2s ease-out;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default Navbar;
