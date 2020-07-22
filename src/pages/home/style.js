
import bgScreen from 'assets/background.jpeg'
import { css } from '@emotion/core'

export const wrapperStyle = css`
    height: 100%;
    background: url(${bgScreen}) center;
    background-size: cover;
    overflow-x: auto;
    white-space: nowrap;
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 32px;
`
