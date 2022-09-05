import React, { FC } from 'react'

type Props = {
  isLoading: Boolean

}

const Loader : FC<Props> =  ({isLoading}) => {
 return isLoading &&(
   <div
    style={{
      position: "fixed", 
      height: "100%", 
      width: "100%", 
      top:0, 
      left: 0, 
      backgroundColor:"rgba(0, 0, 0, 0.4)",
      zIndex:9999,
      paddingTop: "10px",
    }}
   >

  <div className="spinner-border  text-danger" style={{
     margin:"auto",
     left:0,
     right:0,
     top:0,
     bottom:0,
     position:"fixed",
     width : 60,
     height: 60
  }} role="status">
  <span className="sr-only">Loading...</span>
</div>
    </div>
 )
}

export default Loader