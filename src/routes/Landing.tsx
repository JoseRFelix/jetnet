import React from "react";
import { Navbar, Button } from "components";
import styled from "styled-components";
import { ReactComponent as SocialFeedSVG } from "assets/svg/social-feed-colour.svg";
import { ReactComponent as AquaTriangleCircleSquareSVG } from "assets/svg/aqua-tri-circle-square.svg";
import { ReactComponent as CremeTriangleSVG } from "assets/svg/creme-tri.svg";
import { ReactComponent as RedTriangleCircleSVG } from "assets/svg/red-tri-circle.svg";

interface Props {}

const Landing: React.FC<Props> = () => {
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
            <Button>Get Started</Button>
          </span>
          <AquaTriangleCircleSquare />
          <CremeTriangle />
          <RedTriangleCircle />
        </HeroLeft>
        <HeroIllustration />
      </Hero>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
`;

const Hero = styled.section`
  display: flex;
  justify-content: center;

  padding: 10rem 5rem 0 5rem;
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
  width: 70rem;
  margin-top: -10rem;
`;

const RedTriangleCircle = styled(RedTriangleCircleSVG)`
  position: absolute;
  top: -60px;
  left: -40px;
`;

const CremeTriangle = styled(CremeTriangleSVG)`
  position: absolute;
  top: -20px;
  right: 100px;
`;

const AquaTriangleCircleSquare = styled(AquaTriangleCircleSquareSVG)`
  position: absolute;
  bottom: -50px;
  right: 300px;
`;

export default Landing;
