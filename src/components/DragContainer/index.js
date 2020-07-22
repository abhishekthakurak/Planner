import { 
    planItemStyle,
    planCardStyle,
    headerStyle,
    buttonStyle,
} from 'src/components/DragContainer/style.js'
import DragItem from 'src/components/DragItem/index.js'
import AddModal from 'src/components/AddModal/index.js'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
export default function DragContainer ({ data = {}, id }) {
    const { title, planItems, key } = data
    const dispatch = useDispatch()
    const [modalShow, setModalShown] = useState(false)
    
    const handleAdd = useCallback(() => {
        setModalShown(key)
    }, [key])

    const handleOnDrop = useCallback(({newPlanId, event}) => {
        event.stopPropagation()
        const planId = event.dataTransfer.getData('planId')
        const taskId = event.dataTransfer.getData('taskId')
        dispatch({
            type: 'MOVE_TASK_ACROSS_PLAN',
            payload: {
                planId,
                newPlanId,
                taskId
            }
        })
    }, [])

  // this can be used to do things when an item is been dragged
    const handleOnDragOver = useCallback((event) => {
        event.preventDefault() // do not allow browser to do default things
    }, [])

    return (
        <div css={planItemStyle}>
            <div css={planCardStyle} 
                onDrop={(event) => handleOnDrop({newPlanId: id, event})}
                onDragOver={handleOnDragOver}
            >
                <label css={headerStyle}>
                    {title}
                </label>
                <DragItem planItems={planItems} planId={id}/>
                <button
                    css={buttonStyle}
                    onClick={handleAdd}>
                    Add Task
                </button>

                {modalShow && <AddModal id={id} title={title} setModalShown={setModalShown}/>}
            </div>
        </div>
    )
}