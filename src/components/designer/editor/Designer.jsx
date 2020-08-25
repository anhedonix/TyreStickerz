import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { v4 as uuid } from 'uuid'
import { Swipeable } from 'react-touch'
import Slide from './Slide'
import { useEffect } from 'react'
import Canvas from './Canvas'

const useStyles = makeStyles(theme => ({
  designer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundImage: `url('/BGs/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
  },
  breadCrumbs: {
    margin: '0 0 2vh 10vw',
    fontSize: '20px',
    position: 'absolute',
    bottom: '0',
    left: '0',
  },
  viewport: {
    flexGrow: '1',
    height: '50vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-evenly',
  },
  toggle: {
    alignSelf: 'flex-end',
    minWidth: '0',
    margin: '0 2vw 0 0',
    // position: 'absolute',
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundImage: `url('/Tyre.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
  },
  slidebar: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    // height: '20vh',
    alignItems: 'center',
    flexGrow: '0',
    width: '100vw',
    justifyContent: 'center',
    paddingBottom: '4rem',
  },
  visibleSlides: {
    overflow: 'hidden',
    // flexGrow: '1',
    // height: '30vh',
    width: '84vw',
  },
  slides: slideValue => ({
    display: 'flex',
    flexGrow: '1',
    // width: '80vw',
    height: '100%',
    // transform: `translateX(calc(100%*${-slideValue}))`,
    // transition: 'transform 1.5s',
  }),
  arrow: {
    height: '7vw',
    width: '7vw',
    cursor: 'pointer',
    '& svg': {
      height: '7vw',
      width: '7vw',
      opacity: '.7',
    },
  },
}))

const Designer = () => {
  const classes = useStyles()

  const data = () => {
    return {
      image: '/Tyre.png',
      info: {
        header: 'Sticker',
        description: 'description',
        meta1: 'meta1',
        meta2: 'meta2',
        uuid: uuid().slice(0, 8),
      },
    }
  }

  return (
    <div className={classes.designer}>
      <div className={classes.viewport}>
        <Canvas />
        {/* <div className={classes.breadCrumbs}> */}
        {/*   <div style={{ fontSize: '32px', fontWeight: '500' }}>Mazda MX5</div> */}
        {/*   <div style={{ fontSize: '16px', opacity: '.6' }}>Tyre Stickers</div> */}
        {/*   {selected !== undefined && ( */}
        {/*     <div style={{ fontSize: '24px' }}>Code: {selected}</div> */}
        {/*   )} */}
        {/* </div> */}
      </div>
      {/* <div className={classes.slidebar}> */}
      {/*   <div className={classes.arrow}> */}
      {/*     {page !== 0 && ( */}
      {/*       <ArrowRightIcon */}
      {/*         style={{ transform: 'rotate(180deg)' }} */}
      {/*         onClick={() => handleScrollLeft()} */}
      {/*       /> */}
      {/*     )} */}
      {/*   </div> */}
      {/*   <div className={classes.visibleSlides}> */}
      {/*     <Swipeable */}
      {/*       onSwipeLeft={handleScrollRight} */}
      {/*       onSwipeRight={handleScrollLeft} */}
      {/*     > */}
      {/*       <div className={classes.slides}> */}
      {/*         {scrollSlice.map((value, i) => ( */}
      {/*           <Slide */}
      {/*             info={value.info} */}
      {/*             image={value.image} */}
      {/*             key={i} */}
      {/*             id={value.info.uuid} */}
      {/*             order={i} */}
      {/*             page={page} */}
      {/*             handleSelected={handleSelected} */}
      {/*             selected={selected} */}
      {/*           /> */}
      {/*         ))} */}
      {/*       </div> */}
      {/*     </Swipeable> */}
      {/*   </div> */}
      {/*   <div className={classes.arrow}> */}
      {/*     {' '} */}
      {/*     {page !== pages && ( */}
      {/*       <ArrowRightIcon */}
      {/*         className={classes.arrow} */}
      {/*         onClick={() => handleScrollRight()} */}
      {/*       /> */}
      {/*     )} */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  )
}

export default Designer
