import { 
    itemStyle,
    assigneeStyle,
    delayedStyle,
    completedBeforeTimeStyle,
    editStyle
} from 'src/components/DragItem/style.js'
import { useCallback, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import formatDate from 'utils/formatDate'
import Modal from 'src/components/Modal/index.js'


export default function DragItem ({ title, planItems, planId, id }) {
    const dispatch = useDispatch()
    const [editEnable, setEdit] = useState(false)
    
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
        setEdit(true)
    }, [])

    return (
        <Fragment>
            {planItems.map((data, index) => {
            const {description, assignedTo, dueDate} = data
            const delayedTask =  id !== 'done' && new Date(dueDate).getDate() - new Date().getDate() < 0 
            const completedBeforeTime =  id === 'done' && new Date(dueDate).getDate() -  new Date().getDate() > 0 

            return (<div css={[itemStyle, delayedTask && delayedStyle, completedBeforeTime && completedBeforeTimeStyle]} key={index} draggable='true'
                    onDragStart={(event) => handleDragStart({event, planId, index})}
                    onDrop={(event) => handleOnDrop({newTaskId: index, event})}
                    onDragOver={handleOnDragOver}
                    >

                    <div>{description}</div>
                    <div>{formatDate(dueDate)}</div>
                    <div css={assigneeStyle}>{assignedTo}</div>
                    <div css={editStyle} onClick={changeEdit}>Edit</div>
                    {editEnable && <Modal id={planId} title={title} data={data} setModalShown={setEdit} isEdit taskId={index}/>}
                </div>
            )
        })}
        </Fragment>
    )
}
