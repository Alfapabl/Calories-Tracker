import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import {v4 as uuidv4} from 'uuid'

import { categories } from "../data/categorie"
import { activities } from "../types"
import { ActionState, ActivityState} from "../reducers/activity-reducer"

type FormProps = {
    dispatch : Dispatch<ActionState>
    state : ActivityState
}

const initialValues = {
        id : uuidv4(),
        categorias: 1,
        actividad: '',
        calorias: 0,   
}

export default function Form({dispatch, state}: FormProps) {

    const [form, setForm] = useState<activities>(initialValues)

    useEffect(()=> {
        if (state.activityID) {
            console.log('id to edit');
            const selectActivity = state.activity.filter( stateActivity => stateActivity.id === state.activityID)[0] 
            setForm(selectActivity)
                        
        }

    }, [state.activityID])

    function handleChange(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        const isNumberField = ['categorias', 'calorias'].includes(e.target.id)
        setForm({
            ...form,
            [e.target.id] : isNumberField? +e.target.value: e.target.value,
        })
    }

    const isValid = () => form.actividad.trim() !== '' && form.calorias > 0;
    
    function handleSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();

        dispatch({type : 'save-activity', payload : {newActivity : form}})

        setForm(
            {
                ...initialValues ,
                id: uuidv4()
            }
        )
    }
    

  return (
    <>
        <form action="" className=" bg-white rounded-lg space-y-5 shadow p-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="categorias" className=" font-bold flex">Categorias:</label>
                <select id="categorias" className="border border-slate-300 p-2 rounded-lg w-full bg-white" value={form.categorias} onChange={handleChange}>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="actividad" className=" font-bold flex">Actividad:</label>
                <input 
                id="actividad" 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                type="text"
                placeholder="Ej: naranja, ensalada, pesas, bicicleta..."
                value={form.actividad}
                onChange={handleChange}>
                </input>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calorias" className=" font-bold flex">Calorias:</label>
                <input 
                id="calorias" 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                type="number"
                placeholder="Calorias ej 300, 500 ..."
                value={form.calorias}
                onChange={handleChange}>
                </input>
            </div>

            <input type="submit" className="bg-black text-white w-full hover:bg-gray-500 p-2 cursor-pointer disabled:opacity-10" disabled={!isValid()} value={form.categorias === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}  />
        </form>
    </>

  )
}
