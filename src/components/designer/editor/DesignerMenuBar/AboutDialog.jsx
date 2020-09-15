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
    backgroundImage: `url('CompanyLogo.png')`,
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
    backgroundImage: `url('saddles-logo-original.png')`,
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
      <div className={classes.content}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
      <div className={classes.copyRight}>
        <div className={classes.copyRightText}>©Saddles India Pvt. Ltd</div>
        <div className={classes.copyRightImage} />
      </div>
    </div>
  )
}

export default AboutDialogue
