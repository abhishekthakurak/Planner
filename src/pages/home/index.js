import { 
  wrapperStyle,
} from 'pages/home/style.js'
import { useSelector } from 'react-redux'
import DragContainer from 'components/DragContainer/index.js'

function Home () { 
  const { plans } = useSelector(({ planner: { plans = [] } }) => ({ plans }))
  
    return (
      <div css={wrapperStyle}>
      {plans.map((data, index) => {
          return  <DragContainer data={data} key={index} id={index} />
      })}
  </div>
    )
}

export default Home