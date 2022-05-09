interface Course {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Array<Course>;
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
