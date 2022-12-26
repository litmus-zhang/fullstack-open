import './App.css';
import React, { useEffect, useState } from 'react';

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
        props.parts.map(part => <div key={part.name}>
          <Part part={part.name} exercises={part.exercises} />
        </div>)
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

  const [clicks, setClics] = useState({
    left: 0,
    right: 0
  });
  useEffect(() => { }, [clicks]);
  const handleLeftClick = () => { clicks.left++; setClics(clicks) }
  const handleRightClick = () => { clicks.right++; setClics(clicks) }
  console.log(clicks);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
      <main>
        <div>
          {clicks.left}
          <button onClick={handleLeftClick}>
            left
          </button>
          <button onClick={handleRightClick}>
            right
          </button>
          {clicks.right}
        </div>
      </main >
    </div >
  );
}

export default App;
