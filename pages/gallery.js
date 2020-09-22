import Head from 'next/head'
import React from 'react'

import { name } from '../package.json'
import MainLayout from '../src/components/shared/Layout/MainLayout'
import Gallery from '../src/components/designer/Gallery'

export default function designer() {
  return (
    <div className="container">
      <Head>
        <title>{name[0].toUpperCase() + name.substr(1).toLowerCase()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <Gallery />
      </MainLayout>
    </div>
  )
}
