import { modalWrapStyle, dataStyle,inputStyle, buttonStyle,errorStyle, bottomButtonBarStyle } from 'components/AddModal/style.js'
import { createPortal } from 'react-dom'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function ({setModalShown, title, id}) {
  const dispatch = useDispatch()
  const [error, showError] = useState('')
  const [task, setTask] = useState({
        description: '',
        dueDate: '',
        assignedTo: ''
        })

  const handleChange = useCallback(( key, value) => {
        showError('') 
    setTask({
        ...task,
        [key]: value
    })
  }, [task])
  const {description, assignedTo, dueDate} = task


  const onSave = useCallback(()=>{
        if (!description || !dueDate) {
           showError('Description and Due Date is required')
           return
        }
        dispatch({
                type: 'ADD_TASK',
                payload: {
                    id,
                    planItem: task
                }
        })
        setModalShown(false)
  }, [task, id, setModalShown, showError,description, dueDate])

  const onCancel = useCallback(()=>{
        setModalShown(false)
  }, [setModalShown])

  const content = (
  <div css={modalWrapStyle} onClick={()=>setModalShown(false)}>
    <div css={dataStyle} onClick={(e)=>{e.stopPropagation()}}>
        <label>Add task for {title}</label>
      <input
        css={inputStyle}
        placeholder='Enter task description...'
        value={description}
        onChange={(event)=>handleChange('description', event.target.value)} />
        <input 
        css={inputStyle}
        type="date" name="Due Date"
        onChange={(event)=>handleChange('dueDate', event.target.value)}
        ></input>
        <input
        css={inputStyle}
        placeholder='Enter assignee'
        value={assignedTo}
        onChange={(event)=>handleChange('assignedTo', event.target.value)} />
        {error && <label css={errorStyle}>{error}</label>} 
        <div css={bottomButtonBarStyle}>
        <button
                    css={buttonStyle}
                    onClick={onSave}>
                    save
                </button>
                <button
                    css={buttonStyle}
                    onClick={onCancel}>
                    cancel
                </button>
        </div>
    </div>
  </div>)

  return createPortal(content, document.getElementById('modal-root'))
}
