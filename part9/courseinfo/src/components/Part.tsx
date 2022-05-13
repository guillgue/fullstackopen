import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  const part = props.part;
  switch (part.type) {
    case "normal":
      return (
        <div>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      );
    case "submission":
      return (
        <div>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>submit to {part.exerciseSubmissionLink}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
