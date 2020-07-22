import { Core } from 'src/style.js'
import Home from 'pages/Home/index.js'
import { Fragment } from 'react'

export default function App () {
    return (
        <Fragment>
          <div id='modal-root'></div>
          <Core/>
          <Home/>
        </Fragment>
    )
}