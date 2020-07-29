import Head from 'next/head'
import React from 'react'

import { name } from '../../../package.json'
import MainLayout from '../../../src/components/shared/Layout/MainLayout'
import DashboardLayout from '../../../src/components/dashboard/DashboardLayout'

export default function designer() {
  return (
    <div className="container">
      <Head>
        <title>{name[0].toUpperCase() + name.substr(1).toLowerCase()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <DashboardLayout />
      </MainLayout>
    </div>
  )
}
