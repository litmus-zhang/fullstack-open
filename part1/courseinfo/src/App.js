import './App.css';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map(part => <Part part={part.name} exercises={part.exercises} />)
      }
    </div>
  );
}

const Total = (props) => {
  return (
    <p>Number of exercises {
      props.exercises.reduce((sum, part) => sum + part.exercises, 0, 0)
    }</p>
  );
};
function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, {
        name: 'Using props to pass data',
        exercises: 7
      }, {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
}

export default App;
