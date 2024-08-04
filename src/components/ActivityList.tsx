import React, { useMemo } from 'react'
import type { Activity } from '../types'
import { categories } from '../data/categories'
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import type { ActivityActions } from '../reducers/activity-reducer'

type ActivityListProps = {
  activities: Activity[]
  dispatch: React.Dispatch<ActivityActions>
}

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity['category']) =>
      categories.map((cat) => (cat.id === category ? cat.name : '')),
    [activities]
  )

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {isEmptyActivities ? (
        <p className="text-center">No hay actividades aun...</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 bg-white mt-5 flex justify-between py-10"
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                  activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {activity.calories} <span>Calorias</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: 'save-activeId',
                    payload: { id: activity.id }
                  })
                }
              >
                <PencilSquareIcon className="text-gray-800 h-8 w-8" />
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: 'delete-activity',
                    payload: { id: activity.id }
                  })
                }
              >
                <XCircleIcon className="text-red-500 h-8 w-8" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  )
}

export default ActivityList
