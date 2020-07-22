const initialState = JSON.parse(localStorage.getItem('planner')) || {
  plans: [
  {
    key:'plan',
    title: 'Plan',
    planItems: []
  }, 
  {
    key:'started',
    title: 'Started',
    planItems: []
  },
  {
    key:'done',
    title: 'Done',
    planItems: []
  }
]}
  const planner = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
      case 'ADD_PLAN': {
        state.plans.push(payload)
        break
      }
      case 'ADD_TASK':
        if (state.plans[payload.id]){
          state.plans[payload.id].planItems.push(payload.planItem)
        }
        break
      case 'TASK_EDIT': 
        if (state.plans[payload.planId]) {
          state.plans[payload.planId].planItems[payload.id] = payload.planItem
        }
      break

      case 'MOVE_TASK_ACROSS_PLAN':
        let {planId, newPlanId, taskId} = payload
        const [movedTask] = state.plans[planId].planItems.splice(taskId, 1)
        movedTask && state.plans[newPlanId].planItems.push(movedTask)
        break
      
      case 'MOVE_TASK_WITHIN_PLAN':
        let {newTaskId, currentPlanId, prevTaskId} = payload
        let swapper = state.plans[currentPlanId].planItems[newTaskId]
        state.plans[currentPlanId].planItems[newTaskId] = state.plans[currentPlanId].planItems[prevTaskId]
        state.plans[currentPlanId].planItems[prevTaskId] = swapper
        break
      default:
        break
    }
    localStorage.setItem('planner', JSON.stringify(state))
    return state
  }
  
  export default planner
  