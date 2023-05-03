import React, { ReactNode } from 'react'
import styled from 'styled-components'

const CMContainer = ({children}:{children:ReactNode}) => {
  return (
    <Container>{children}</Container>
  )
}

const Container =  styled.div`
background-color: #fff;
width:100%;
position:absolute;
top:80px;
left:10px;
max-height: 290px;
overflow:auto;
border-radius:15px;
padding: 10px 0px;
`

export default CMContainer