import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "slices";
import styled from "styled-components";
import { Navbar, Footer, Button } from "components";
import { useHistory } from "react-router-dom";

import { ReactComponent as PersonSVG } from "assets/svg/person.svg";
import { routes } from "../constants";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

interface Props {}

const UserProfile: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user);
  const userBirthday = new Date(user.birthday);

  const { push } = useHistory();

  return (
    <Wrapper>
      <Navbar isLoggedIn />
      <UserProfileBox>
        <LeftSection>
          <UserAvatar src={user.picture ? user.picture : undefined} />
          <span>
            <Button onClick={() => push(routes.user.EditProfile)}>
              Edit Profile
            </Button>
          </span>
        </LeftSection>
        <InformationBox>
          <UserFullName>{user.fullName}</UserFullName>
          <TabBar>
            <Tab>
              <PersonSVG />
              About
            </Tab>
          </TabBar>
          <AboutBox>
            <AboutTitle>Contact Information</AboutTitle>
            <AboutRow>
              <AboutRowName>Phone:</AboutRowName>
              <p>{user.phone}</p>
            </AboutRow>
            <AboutRow>
              <AboutRowName>Address:</AboutRowName>
              <p>
                {" "}
                {`${user.address?.street} ${user.address?.city}, ${user.address?.state} ${user.address?.zip} ${user.address?.country}`}
              </p>
            </AboutRow>
            <AboutRow>
              <AboutRowName>E-mail:</AboutRowName>
              <p> {user.email}</p>
            </AboutRow>
            <AboutTitle>Basic Information</AboutTitle>
            <AboutRow>
              <AboutRowName>Birthday:</AboutRowName>
              <p>
                {`${
                  monthNames[userBirthday.getMonth()]
                } ${userBirthday.getDay()}, ${userBirthday.getFullYear()}`}
              </p>
            </AboutRow>

            <Questions>
              <AboutRowName>Security Questions:</AboutRowName>
              <ol>
                {user?.securityQuestions?.map(({ question, answer }) => (
                  <Question key={question}>
                    <h2>{question}</h2>
                    <p>{answer}</p>
                  </Question>
                ))}
              </ol>
            </Questions>
          </AboutBox>
        </InformationBox>
      </UserProfileBox>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const UserProfileBox = styled.div`
  display: flex;
  justify-content: center;

  flex-wrap: wrap;

  padding: 4rem;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-right: 10rem;

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const UserAvatar = styled.img`
  width: 20rem;
  height: 20rem;

  border: none;

  border-radius: 50%;

  background-color: grey;
`;

const InformationBox = styled.div`
  display: flex;
  flex-direction: column;

  flex: 0 0 50%;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const UserFullName = styled.h1`
  font-weight: 500;
  font-size: 6rem;
`;

const TabBar = styled.div`
  width: 100%;

  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const Tab = styled.div`
  width: 13%;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-bottom: 0.3rem;

  border-bottom: 2px solid ${({ theme }) => theme.colors.main};

  font-weight: 600;
  font-size: 1.7rem;

  color: rgba(0, 0, 0, 0.7);

  svg {
    width: 2rem;

    margin-right: 0.5rem;
  }
`;

const AboutBox = styled.div`
  margin-top: 1rem;

  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const AboutTitle = styled.h2`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;

  font-size: 1.6rem;
`;

const AboutRow = styled.div`
  display: flex;

  p {
    width: 25rem;
  }
`;

const AboutRowName = styled.h3`
  font-weight: 600;
  margin-right: 1.5rem;

  width: 9rem;
`;

const Questions = styled.div`
  display: flex;

  h3 {
    margin-right: 2rem;
  }

  ol {
    width: 33rem;
  }
`;

const Question = styled.li`
  font-weight: 600;

  p {
    padding: 0.4rem 0;
    font-weight: 400;
  }
`;

export default UserProfile;
