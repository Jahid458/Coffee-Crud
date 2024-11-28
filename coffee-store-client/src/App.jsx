
import { useLoaderData } from 'react-router-dom'
import './App.css'
import CoffeeCard from './components/CoffeeCard';
import { useState } from 'react';

function App() {

  const loadedcoffees = useLoaderData();
  const [coffees,setCoffees] = useState(loadedcoffees)


  return (
    <div className='m-20'>
      <h1 className='text-6xl text-center text-purple-600'>Hot Cold Coffe: {coffees.length}</h1>
     <div className='grid md:grid-cols-2 gap-4'>
     {
        coffees.map(cofee => <CoffeeCard
           key={cofee._id} 
          coffee={cofee}
          coffees={coffees}
          setCoffees={setCoffees}
          ></CoffeeCard>)
      }
     </div>
    </div>
  )
}

export default App
