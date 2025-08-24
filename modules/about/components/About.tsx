import Breakline from "@/common/components/elements/Breakline";

import Story from "./Story";
import PortfolioVideo from "./PortfolioVideo";
import CareerList from "./CareerList";
import EducationList from "./EducationList";

const About = () => {
  return (
    <>
      <Story />
      <Breakline className="my-8" />
      <PortfolioVideo />
      <Breakline className="my-8" />
      <CareerList />
      <Breakline className="my-8" />
      <EducationList />
    </>
  );
};

export default About;
