import { activities } from "../types"
import { categories } from "../data/categorie"
import { useMemo, Dispatch } from "react"
import {PencilSquareIcon, XCircleIcon} from '@heroicons/react/24/outline'
import { ActionState} from "../reducers/activity-reducer"

type activityProps = {
    activities : activities [],
    dispatch : Dispatch<ActionState>
}

export default function ActivityList({activities, dispatch} : activityProps) {

    const categoryName = useMemo(()=> (category: activities['categorias'])=> categories.map(cat => cat.id === category ? cat.name : '') , [activities])
    const isEmpty = useMemo(()=> (activities.length === 0), [activities])
    
  return (
    <>      

        <h2 className="text-4xl font-bold text-slate-600 text-center">Comidas y Actividades</h2>
        {
        isEmpty ? <p className=" my-5 ">no hay actividades...</p> :
        
        activities.map( activity=> ( 
            <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between"> 
                <div className="space-y-2 relative">
                    <p className={`absolute -top-10 -left-8 px-10 py-2 uppercase text-white font-bold ${activity.categorias == 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>{categoryName(activity.categorias)}</p>
                    <p className="text-2xl font-bold pt-5">{activity.actividad}</p>
                    <p className="font-black text-4xl text-lime-500">{activity.calorias} {''} <span>Calorias</span></p>
                </div>
                <div className="flex gap-5 items-center">
                    <button  onClick= {()=>dispatch({type : 'set-activity-id', payload : {id: activity.id}})}>
                        <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
                    </button>
                    <button onClick= {()=>dispatch({type : 'delete-activity', payload : {id: activity.id}})}>
                        <XCircleIcon className="h-8 w-8 text-red-800"/>
                    </button>
                </div>
  
            </div>
        ))}
    </>
  )
}
