import { 
    itemStyle,
    assigneeStyle
} from 'src/components/DragItem/style.js'
import { useCallback, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import formatDate from 'utils/formatDate'

export default function DragItem ({ planItems, planId }) {
    const dispatch = useDispatch()
    const [editEnable, setEditEnable] = useState(false)
    
    const handleDragStart = useCallback(({event, planId, index}) => {
        event.dataTransfer.setData('planId', planId)
        event.dataTransfer.setData('taskId', index)
    }, [])

    const handleOnDrop = useCallback(({newTaskId, event}) => {
        const planId = event.dataTransfer.getData('planId')
        const taskId = event.dataTransfer.getData('taskId')
        dispatch({
            type: 'MOVE_TASK_WITHIN_PLAN',
            payload: {
                currentPlanId: planId,
                newTaskId,
                prevTaskId: taskId
            }
        })
    }, [])

    // this can be used to do things when an item is been dragged
    const handleOnDragOver = useCallback((event) => {
        event.preventDefault() // do not allow browser to do default things
    }, [])

    const changeEdit = useCallback(() => {
        setEditEnable(true)
    }, [])

    return (
        <Fragment>
            {planItems.map(({description, assignedTo, dueDate}, index) => (
                <div css={itemStyle} key={index} draggable='true'
                    onDragStart={(event) => handleDragStart({event, planId, index})}
                    onDrop={(event) => handleOnDrop({newTaskId: index, event})}
                    onDragOver={handleOnDragOver}
                    >

                    <div>{description}</div>
                    <div>{formatDate(dueDate)}</div>
                    <div css={assigneeStyle}>{assignedTo}</div>
                </div>
            ))}
        </Fragment>
    )
}
