import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'

import { name } from '../../package.json'
import Design from '../../src/components/designer/editor/Design'

export default function designer() {
  return (
    <div className="container">
      <Head>
        <title>{name[0].toUpperCase() + name.substr(1).toLowerCase()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Design />
    </div>
  )
}
