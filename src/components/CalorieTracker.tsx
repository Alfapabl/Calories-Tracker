import { useMemo } from "react"
import { activities } from "../types"
import Quantity from "./Quantity"

type CalorieTrackerProps = {
  activity : activities[]
}

export default function CalorieTracker({activity} : CalorieTrackerProps) {

  const totalCalories = useMemo(()=> activity.reduce((total, activities) => activities.categorias === 1 ? total + activities.calorias : total, 0) ,[activity])
  const burnCalories = useMemo(()=> activity.reduce((total, activities) => activities.categorias === 2 ? total + activities.calorias : total, 0) ,[activity])
  const netCalories = useMemo(()=> totalCalories-burnCalories,[activity])

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen De Calorias</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <Quantity 
          Calories = {totalCalories}
          activity = {'Consumidas'}
        />
        <Quantity 
          Calories = {burnCalories}
          activity = {'Quemadas'}
        />
        <Quantity 
          Calories = {netCalories}
          activity = {'Totales del día'}
        />
      </div>
    </>
  )
}
