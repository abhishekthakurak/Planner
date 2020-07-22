import { modalWrapStyle, dataStyle,inputStyle, buttonStyle,errorStyle, bottomButtonBarStyle } from 'components/Modal/style.js'
import { createPortal } from 'react-dom'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function ({setModalShown, title, id,taskId, isEdit=false, data = {
    description: '',
    dueDate: '',
    assignedTo: ''
  }}) {
  const dispatch = useDispatch()
  const [error, showError] = useState('')
  const [task, setTask] = useState(data)

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
        if (isEdit) {
          dispatch({
            type: 'TASK_EDIT',
            payload: {
                planId: id,
                id: taskId,
                planItem: task
            }
    })
        } else {
          dispatch({
                  type: 'ADD_TASK',
                  payload: {
                      id,
                      planItem: task
                  }
          })
      }
      setModalShown(false)
  }, [task, id, taskId, setModalShown, showError,description, dueDate])

  const onCancel = useCallback(()=>{
        setModalShown(false)
  }, [setModalShown])

  const content = (
  <div css={modalWrapStyle} onClick={()=>setModalShown(false)}>
    <div css={dataStyle} onClick={(e)=>{e.stopPropagation()}}>
        <label>{isEdit? 'Edit':'Add'} task for {title}</label>
      <input
        css={inputStyle}
        placeholder='Enter task description...'
        value={description}
        onChange={(event)=>handleChange('description', event.target.value)} />
        <input 
        css={inputStyle}
        value={dueDate}
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
                    {isEdit ? 'edit' : 'save'}
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
