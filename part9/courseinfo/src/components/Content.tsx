import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  parts: Array<CoursePart>;
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

export default Content;
