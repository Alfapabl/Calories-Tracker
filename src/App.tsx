import { useEffect, useReducer } from 'react'
import './App.css'
import Form from './components/Form'
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './components/ActivityList'
import CalorieTracker from './components/CalorieTracker'


function App() {

  const[state, dispatch] = useReducer(activityReducer, initialState)
  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activity))
  }, [state.activity ])

  return (
    <div className='bg-[whitesmoke]'>
      <header className=' bg-lime-700 py-3'>
        <div className=' max-w-4xl mx-auto flex justify-between items-center'>
          <h1 className=' text-center text-lg font-bold text-white uppercase '>Contador de Calorias</h1>
          <button className='bg-gray-800 hover:bg-gray-900 p-2 font-bold text-white rounded-lg cursor-pointer uppercase bold text-sm' onClick={()=>dispatch({type: 'restart-app'})}>Reiniciar APP</button>
        </div>
      </header>

      <section className='bg-lime-600 py-20 px-20'>
        <div className='max-w-4xl mx-auto'>
          <Form 
            dispatch = {dispatch}
            state = {state}/>
        </div>
      </section>

      <section className='bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker 
            activity = {state.activity}
          />
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList 
          activities = {state.activity}
          dispatch = {dispatch}/>
      </section>

    </div>
  )
}

export default App
