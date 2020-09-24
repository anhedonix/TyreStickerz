import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { name, version } from '../../../../../package.json'

const useStyles = makeStyles(theme => ({
  aboutDialogue: {
    width: '600px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '16px',
    // backgroundColor: theme.palette.primary,
  },
  header: {
    display: 'flex',
    // margin: '8px',
  },
  logo: {
    width: '50px',
    height: '50px',
    backgroundImage: `url('/CompanyLogo.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  titleFontWrapper: {
    marginLeft: '8px',
  },
  copyRightImage: {
    width: '50px',
    height: '50px',
    backgroundImage: `url('/SaddlesLogo.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  copyRight: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

const AboutDialogue = props => {
  const classes = useStyles()
  return (
    <div className={classes.aboutDialogue}>
      <div className={classes.header}>
        <div className={classes.logo} />
        <div className={classes.titleFontWrapper}>
          <div className={classes.title}>{name}</div>
          <div className={classes.version}>{version}</div>
        </div>
      </div>
      <div className={classes.content}> </div>
      <a
        href="https://saddlesindia.com/"
        style={{ color: 'inherit' }}
        target="_blank"
      >
        <div className={classes.copyRight}>
          <div className={classes.copyRightText}>©Saddles India Pvt. Ltd</div>
          <div className={classes.copyRightImage} />
        </div>
      </a>
    </div>
  )
}

export default AboutDialogue
