import { css } from '@emotion/core'

export const itemStyle = css`
    padding: 12px;
    position: relative;
    margin: 4px 12px;
    background: #fff;
    border-radius: 4px;
    border: 2px solid #ddd;
    position: relative;
    height: 80px;
`

export const assigneeStyle = css`
    position: absolute;
    right: 12px;
    bottom: 12px;
    font-size: 16px;
`

export const delayedStyle = css`
    background: red;
`

export const completedBeforeTimeStyle = css`
    background: green;
    color: white;
`

export const editStyle = css`
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 10px;
    background: lightgrey;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
`