import { activities } from "../types"



export type ActivityState = {
    activity : activities[],
    activityID: string
}

export type ActionState = 
    {type: 'save-activity', payload : {newActivity : activities} } |
    {type: 'set-activity-id', payload : {id : activities['id']} } |
    {type: 'delete-activity', payload : {id : activities['id']} } |
    {type: 'restart-app'}


const localStorageActivity = () : activities[]=> {
    const actitivies = localStorage.getItem('activities')
    return actitivies ? JSON.parse(actitivies) : []

}

export const initialState : ActivityState = {
    activity : localStorageActivity(),
    activityID : ''
}

export const activityReducer = (
    state : ActivityState = initialState,
    action : ActionState 
) => {
    switch (action.type) {
        case 'save-activity':
            let updatedActivity : activities[] = []
            if (state.activityID) {
                updatedActivity = state.activity.map((activity)=> state.activityID === activity.id ? action.payload.newActivity : activity)
            }
            else {
                updatedActivity =  [...state.activity, action.payload.newActivity]
            }

           return {
                ...state,
                activity : updatedActivity,
                activityID : ''
           }

        case 'set-activity-id' :
            return {
                ...state,
                activityID : action.payload.id
            }

        case 'delete-activity': 
            return{
                ...state,
                activity : state.activity.filter((activity)=> activity.id !== action.payload.id)

        }

        case 'restart-app': 
            return {
                activity: [],
                activityID : ''
            }
             
        default:
            break;
    }
    return state
}
