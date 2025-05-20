import React from "react";
import {motion} from "framer-motion"

export default function PageTransition({isActive}:{isActive:boolean}){
  return(
    isActive && (
      <motion.div
        initial={{x:"100%"}} //最初は画面右端から.
        animate={{x:0}}      //中央にスライド.
        exit={{x:"-100%"}}   //(使ったら)左端にスライド.
        transition={{duration:0.5, ease:"easeInOut"}}

        style={{
          backgroundColor:"#389500",
          width:"100vw",height:"100vh",
          position:"fixed",top:"0",left:"0",
          zIndex:99999,
        }}
      ></motion.div>
    )
  )
}