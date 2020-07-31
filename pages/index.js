import Head from 'next/head'
import React, { useState } from 'react'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import { name } from '../package.json'
import MainLayout from '../src/components/shared/Layout/MainLayout'
// import DesignerLinkBanner from '../public/Banners/DesignerLinkBanner.jpg'

const useStyles = makeStyles(theme => ({
  designerLinkCard: {
    margin: '100px 0 0 0',
    width: '500px',
    height: '250px',
    display: 'flex',
    backgroundImage: `url('/Banners/TyreStickersBanner.jpg')`,
    backgroundSize: 'cover',
    backgroundPositionY: '-100px',
    cursor: 'pointer',
  },
  designerLinkCover: {
    backgroundColor: 'rgba(0,0,0,.6)',
    width: '100%',
    display: 'flex',
    zIndex: '0',
  },
  text: {
    fontSize: '30px',
    fontWeight: '500',
    margin: 'auto',
    color: 'white',
    zIndex: '1',
  },
  tittle: {
    margin: '50px 0 0 0',
  },
}))

export default function Home() {
  const classes = useStyles()
  const [hover, setHover] = useState(false)
  return (
    <div>
      <Head>
        <title>{name[0].toUpperCase() + name.substr(1).toLowerCase()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <h1 className={classes.tittle}>
          Welcome to {name[0].toUpperCase() + name.substr(1).toLowerCase()}
        </h1>
        <Link href="/designer">
          <Paper
            className={classes.designerLinkCard}
            elevation={hover ? 24 : 10}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className={classes.designerLinkCover}>
              <div className={classes.text}>Customize Tyre Stickers</div>
            </div>
          </Paper>
        </Link>
      </MainLayout>
    </div>
  )
}
