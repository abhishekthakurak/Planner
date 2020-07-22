
import { css } from '@emotion/core'

export const modalWrapStyle =  css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;

`

export const dataStyle = css`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 11;
    padding: 24px;
    display: flex;
    width: 50%;
    flex-direction: column;
`

export const inputStyle = css`
    font-size: 16px;
    height: 40px; 
    width: 250px; 
    margin: 8px;
`


export const buttonStyle = css` 
    border-radius: 3px;
    color: #5e6c84;
    margin: 8px;
    padding: 4px 8px;
`

export const bottomButtonBarStyle = css`
    display: inline-block;
    position: absolute;
    right: 12px;
    bottom: 12px;
`

export const errorStyle = css`
    color: red;
    font-size: 16px;
    margin: 12px;
`



