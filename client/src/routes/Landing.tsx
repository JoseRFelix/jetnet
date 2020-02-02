import React from "react";
import { Navbar, Button } from "components";
import styled from "styled-components";
import { ReactComponent as SocialFeedSVG } from "assets/svg/social-feed-colour.svg";
import { ReactComponent as AquaTriangleCircleSquareSVG } from "assets/svg/aqua-tri-circle-square.svg";
import { ReactComponent as CremeTriangleSVG } from "assets/svg/creme-tri.svg";
import { ReactComponent as RedTriangleCircleSVG } from "assets/svg/red-tri-circle.svg";
import { ReactComponent as ThumbsUpSVG } from "assets/svg/thumbs-up.svg";
import { ReactComponent as ServerWomanSVG } from "assets/svg/server-woman-colour.svg";
import { ReactComponent as DrawingManSVG } from "assets/svg/drawing-man-colour.svg";
import { useDispatch } from "react-redux";
import { showModal } from "slices/modal";
import { modalTypes } from "../constants";

interface Props {}

const Landing: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const openSignUp = () => {
    dispatch(showModal({ modalType: modalTypes.signUp, modalProps: {} }));
  };

  return (
    <Wrapper>
      <Navbar />
      <Hero>
        <HeroLeft>
          <HeroHeader>
            Jet
            <br />
            Friends
          </HeroHeader>
          <HeroSubHeader>
            Find friends at jet speed with Our world-class social network
          </HeroSubHeader>
          <span>
            <Button onClick={openSignUp}>Get Started</Button>
          </span>
          <HeroAquaTriangleCircleSquare />
          <HeroCremeTriangle />
          <HeroRedTriangleCircle />
        </HeroLeft>
        <HeroIllustration />
      </Hero>
      <Features>
        <FeaturesSubHeader>How It Works</FeaturesSubHeader>
        <FeaturesHeader>You Are In Control</FeaturesHeader>

        <FeaturesBox>
          <div>
            <Feature>
              <AquaTriangleCircleSquareSVG />
              <FeatureHeading>All Starts With a Profile</FeatureHeading>
              <FeatureSubHeading>
                Create a profile and start connecting with users around the
                world.
              </FeatureSubHeading>
            </Feature>
            <Feature>
              <ThumbsUpSVG />
              <FeatureHeading>Don't be afraid of mistakes</FeatureHeading>
              <FeatureSubHeading>
                Don't worry if something has changed, you are able to update
                your profile as needed.
              </FeatureSubHeading>
            </Feature>
          </div>
          <FeatureIllustration />
        </FeaturesBox>
      </Features>
      <CallToAction>
        <div>
          <DrawingMan />
        </div>
        <CallToActionBox>
          <CallToActionHeader>Try It For Free</CallToActionHeader>
          <span>
            <Button onClick={openSignUp}>Get Started</Button>
          </span>
          <CTACremeTriangle />
          <CTARedTriangleCircle />
        </CallToActionBox>
      </CallToAction>
      <Footer>
        <div>
          <FooterLogo>JETNET</FooterLogo>
          <FooterCopyright>2020 © All rights reserved</FooterCopyright>
        </div>
        <FooterLinks>
          <FooterColumn>
            <FooterColumnHeader>About</FooterColumnHeader>
            <FooterColumnItem>About the company</FooterColumnItem>
            <FooterColumnItem>Blog</FooterColumnItem>
            <FooterColumnItem>Sitemap</FooterColumnItem>
          </FooterColumn>
          <FooterColumn>
            <FooterColumnHeader>Company</FooterColumnHeader>
            <FooterColumnItem>Security & Privacy</FooterColumnItem>
            <FooterColumnItem>Careers</FooterColumnItem>
            <FooterColumnItem>Affiliates</FooterColumnItem>
          </FooterColumn>
          <FooterColumn>
            <FooterColumnHeader>Help</FooterColumnHeader>
            <FooterColumnItem>Get Started</FooterColumnItem>
            <FooterColumnItem>Contact Us</FooterColumnItem>
            <FooterColumnItem>Customer Service</FooterColumnItem>
          </FooterColumn>
        </FooterLinks>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
`;

const Hero = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 8rem 5rem 0 5rem;
`;

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  & > *:not(:last-child) {
    margin-bottom: 5rem;
  }
`;

const HeroHeader = styled.h1`
  font-weight: 600;
  font-size: 15rem;

  line-height: 16rem;
`;

const HeroSubHeader = styled.h1`
  width: 50%;

  color: rgba(0, 0, 0, 0.7);
  font-size: 2.3rem;
  font-weight: 400;

  padding: 0 2rem;
  border-left: 1px solid ${({ theme }) => theme.colors.main};
`;

const HeroIllustration = styled(SocialFeedSVG)`
  width: 50rem;
  margin-top: -10rem;
`;

const HeroRedTriangleCircle = styled(RedTriangleCircleSVG)`
  position: absolute;
  top: -60px;
  left: -40px;
`;

const HeroCremeTriangle = styled(CremeTriangleSVG)`
  position: absolute;
  top: -20px;
  right: 100px;
`;

const HeroAquaTriangleCircleSquare = styled(AquaTriangleCircleSquareSVG)`
  position: absolute;
  bottom: -50px;
  right: 300px;
`;

const Features = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 5rem;
`;
const FeaturesSubHeader = styled.h4`
  color: ${({ theme }) => theme.colors.secondary};
`;

const FeaturesHeader = styled.h1`
  font-weight: 400;
  font-size: 6rem;
`;

const FeaturesBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  padding: 10rem 5rem 0 5rem;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 44rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  &:not(:last-child) {
    margin-bottom: 6rem;
  }
`;

const FeatureHeading = styled.h1`
  font-weight: 400;
  font-size: 2.8rem;
`;

const FeatureSubHeading = styled.h1`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 35px;

  color: rgba(0, 0, 0, 0.6);
`;

const FeatureIllustration = styled(ServerWomanSVG)`
  width: 75rem;
  margin-top: -10rem;
`;

const CallToAction = styled.section`
  display: flex;
  align-items: center;

  padding-top: 10rem;

  position: relative;

  & > div:first-child {
    position: relative;

    &::before {
      content: "";
      position: absolute;

      z-index: -1;

      width: 140%;
      height: 60rem;

      background-color: rgba(86, 202, 216, 0.2);
      border-radius: 40px;

      top: 0;
      left: -40%;
    }
  }
`;

const DrawingMan = styled(DrawingManSVG)`
  width: 80rem;
  margin-top: -10rem;
`;

const CallToActionBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  position: relative;

  align-items: center;
  justify-content: center;

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const CallToActionHeader = styled.h1`
  font-weight: 400;
  font-size: 5rem;
`;

const CTACremeTriangle = styled(CremeTriangleSVG)`
  position: absolute;
  top: -80px;
  right: 20%;
`;

const CTARedTriangleCircle = styled(RedTriangleCircleSVG)`
  position: absolute;
  bottom: -80px;
  left: 20%;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-evenly;

  padding: 6rem 0 4rem 0;

  & > div:first-child {
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const FooterLogo = styled.h1`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 2.3rem;
  letter-spacing: 2px;
`;

const FooterCopyright = styled.p`
  color: rgba(0, 0, 0, 0.7);
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: space-evenly;

  & > *:not(:last-child) {
    margin-right: 15rem;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }

  & > *:first-child {
    margin-bottom: 2rem;
  }
`;

const FooterColumnHeader = styled.h2`
  text-transform: uppercase;
  font-size: 1.8rem;
`;

const FooterColumnItem = styled.p`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;

export default Landing;
