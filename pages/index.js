import Head from 'next/head'
import React from 'react'
import Link from 'next/Link'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import { name } from '../package.json'
import MainLayout from '../src/components/shared/Layout/MainLayout'
// import DesignerLinkBanner from '../public/Banners/DesignerLinkBanner.jpg'

const useStyles = makeStyles((theme) => ({
  designerLinkCard: {
    margin: '100px 0 0 0',
    width: '500px',
    height: '250px',
    display: 'flex',
    backgroundImage: `url(https://http2.mlstatic.com/letras-para-llantas-hechas-de-caucho-D_NQ_NP_725621-MLM20805920899_072016-O.webp)`,
    backgroundSize: 'cover',
    backgroundPositionY: '-100px',
    cursor: 'pointer',
  },
  designerLinkCover: {
    backgroundColor: 'black',
    width: '100%',
    display: 'flex',
    opacity: '.6',
    '&:hover': {
      opacity: '.7',
    },
  },
  text: {
    fontSize: '30px',
    fontWeight: '500',
    margin: 'auto',
  },
  tittle: {
    margin: '50px 0 0 0',
  },
}))

export default function Home() {
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>{name[0].toUpperCase() + name.substr(1).toLowerCase()}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MainLayout>
        <h1 className={classes.tittle}>
          Welcome to {name[0].toUpperCase() + name.substr(1).toLowerCase()}
        </h1>
        <Link href='/designer'>
          <Paper className={classes.designerLinkCard} elevation='10'>
            <div className={classes.designerLinkCover}>
              <div className={classes.text}>Customize Tyre Stickers</div>
            </div>
          </Paper>
        </Link>
      </MainLayout>
    </div>
  )
}
