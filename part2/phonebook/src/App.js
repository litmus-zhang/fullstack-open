import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [persons, setPersons] = useState([]);
  const [data, setData] = useState({
    newName: '',
    newNumber: ''
  })

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    })
  }, [persons])
  const handleChange = e => {
    e.preventDefault();
    if (persons.some(person => person.name === data.newName)) {
      alert(`${data.newName} is already added to phonebook`);
      return;
    }

    const personObject = [...persons, { name: data.newName, number: data.newNumber }];
    setPersons(personObject);
    console.log(persons);
    setData({ newName: '', newNumber: '' });
  }

  const handleAdd = e => {
    const newData = { ...data, [e.target.name]: e.target.value }
    console.log(newData)
    // console.log(data)
    setData(newData)


  }

  const handleFilter = e => {
    e.preventDefault();
    const filter = e.target.value;
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    setPersons(filtered);
  }


  return (
    <div className="">
      <p>
        filter shown with <input onChange={handleFilter} />
      </p>
      <h1>
        Phonebook
      </h1>
      <form onSubmit={handleChange}>
        <div>
          name : <input value={data.newName} name={data.newName} onChange={handleAdd} />
        </div>
        <div>
          number : <input value={data.newNumber} name={data.newNumber} onChange={handleAdd} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person, i) => <div key={i}>{person.name} - {person.number}</div>)
      }
    </div>
  );
}

export default App;
