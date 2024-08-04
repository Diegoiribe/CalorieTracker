import type { Activity } from '../types'
import { useMemo } from 'react'
import CalorieDisplay from './CalorieDisplay'

type CalorieTrackerProps = {
  activities: Activity[]
}

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  //contadores
  const caloriesCosumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  )

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  )

  const netCalories = useMemo(
    () => caloriesCosumed - caloriesBurned,
    [activities]
  )

  return (
    <>
      <h2 className="text-4xl dont-black text-white text-center">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col items-center md:md-flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesCosumed} text="Consumidas" />
        <CalorieDisplay calories={caloriesBurned} text="Ejercicio" />
        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  )
}

export default CalorieTracker
