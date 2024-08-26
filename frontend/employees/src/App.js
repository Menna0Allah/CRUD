import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [emps,setEmps] = useState([]);
  const [name,setName] = useState('');
  const [job,setJob] = useState('');
  const [years,setYears] = useState('');
  const [editindex,setEditindex] = useState(null);
  const [search,setSearch] = useState('');

  useEffect(()=>{
    fetch('http://localhost:8000/api/emps/')
      .then(response => response.json())
      .then(data => setEmps(data))
      .catch(error => console.error('Error is ',error));
  },[]);

  const addEmps = () => {
    if(name === '' || job ==='' || years ===''){
      return;
    }
    const newEmps = {name,job,years}
    fetch('http://localhost:8000/api/emps/add/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newEmps)
    })  
    .then(response => response.json())
    .then(data => {
      setEmps([...emps,data]);
      setName('');
      setJob('');
      setYears('');
    })
    .catch(error => console.error('Error is',error));
  };

  const deleteEmps= (i) =>{
    const x = emps[i];
    fetch(`http://localhost:8000/api/emps/delete/${x.id}/`,{
      method:'DELETE',
    })
    .then(()=>{
      const newemps = emps.filter((_,index)=> index !== i);
      setEmps(newemps);
    });
  };

  const startedit = (i) => {
    const x = emps[i];
    setName(x.name);
    setJob(x.job);
    setYears(x.years);
    setEditindex(i);
  }

  const updateEmps = (i) =>{
    if (name === '' ||job === ''|| years === ''){
      return;
    }
    const newEmps = {name,job,years};
    const x = emps[editindex].id;

    fetch(`http://localhost:8000/api/emps/update/${x}/`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(newEmps)
    })
    .then(response => response.json())
    .then(data => {
      const updatedList = emps.map(emp => emp.id === data.id ? data : emp);
      setEmps(updatedList);
      setName('');
      setJob('');
      setYears('');
      setEditindex(null);
    })
    .catch(error => console.error('Error is',error))
  };

  const searchEmps = emps.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="App">

      <h2 className='title'>"Here you can add new employees or update them"</h2>
      <div className='container'>
        <input 
        value={name} 
        onChange={(e)=>setName(e.target.value)} 
        placeholder='name'
        className='name'
        />
        <input 
        value={job} 
        onChange={(e)=>setJob(e.target.value)} 
        placeholder='job'
        className='job'
        />
        <input 
        value={years} 
        onChange={(e)=>setYears(e.target.value)} 
        placeholder='years'
        className='years'
        />
      </div>

      <div className='as'>
        {editindex === null ? (<button onClick={addEmps}>Add</button>) : (<button onClick={updateEmps}>Save</button>)}
      </div>

      <div className='search'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='search by name'
        />
      </div>

      <div className='emps'>
        {/* <p>Your employees list is here:</p> */}
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Years</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {searchEmps.map(({id,name,job,years},i) => (
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{job}</td>
                        <td>{years}</td>
                        <td id="listo">
                            <button id="listb" onClick={()=>startedit(i)}>Update</button>
                            <button id="listb" onClick={()=>deleteEmps(i)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
