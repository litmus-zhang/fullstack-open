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
  const course = [{
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
  }, {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }]

  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  });
  const [allClicks, setAll] = useState([]);
  useEffect(() => { }, [clicks]);
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setClicks({ ...clicks, left: clicks.left + 1 });
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setClicks({ ...clicks, right: clicks.right + 1 });
  }

  const resetClicks = () => {
    setClicks({ left: 0, right: 0 });
    setAll([]);
  };
  const setLeftClicktoNumber = (number) => {
    setClicks({ ...clicks, left: number });
    setAll(allClicks.filter((click) => click !== 'L'));

  };
  const setRightClicktoNumber = (number) => {
    setClicks({ ...clicks, right: number });
    setAll(allClicks.filter((click) => click !== 'R'));
  };
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
          <br />
          <button onClick={resetClicks}>
            reset
          </button>
          <br />
          <button onClick={() => setLeftClicktoNumber(0)}>
            set left to 0
          </button>
          <button onClick={() => setRightClicktoNumber(0)}>
            set right to 0
          </button>
        </div>

        {
          allClicks.length ? <p>{allClicks.join(' - ')}</p> : <p>No clicks yet</p>
        }
      </main >
    </div >
  );
}

export default App;
