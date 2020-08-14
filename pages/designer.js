import Head from 'next/head'
import React from 'react'

import { name } from '../package.json'
import MainLayout from '../src/components/shared/Layout/MainLayout'
import Designer from '../src/components/designer/editor'
import DesignerWrapper from '../src/wrappers/DesignerWrapper'

export default function designer() {
  return (
    <div className="container">
      <Head>
        <title>{name[0].toUpperCase() + name.substr(1).toLowerCase()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <DesignerWrapper>
          <Designer />
        </DesignerWrapper>
      </MainLayout>
    </div>
  )
}
