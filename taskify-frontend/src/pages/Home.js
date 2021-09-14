import {Box} from '@material-ui/core'
import React, {useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ContainerBody from '../component/ContainerBody'

import Footer from '../component/Footer/Footer'

function Home({match}) {
  const boardId = useMemo(() => match.params.boardId, [match.params.boardId])
  console.log({match})
  return (
    <Box style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
      <Box style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
        <ContainerBody boardId={boardId} />
      </Box>

      <Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default Home
