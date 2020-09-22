import Head from 'next/head'
import React from 'react'

import { name } from '../../package.json'
import Editor from '../../src/components/designer/editor/Editor'
import MainLayout from '../../src/components/shared/Layout/MainLayout'

export default function designer() {
  return (
    <div className="container">
      <Head>
        <title>{name[0].toUpperCase() + name.substr(1).toLowerCase()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <Editor />
      </MainLayout>
    </div>
  )
}
