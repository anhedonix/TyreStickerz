import React, { useEffect, useState, useContext, Suspense } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import axios from 'axios'
import GLBLoader from './Loader/GLBLoader'
import { OrbitControls, Shadow } from 'drei'

import * as CONTENT from '../../../../constants/contentTypes'

import { DesignerContext } from '../../../../states/designer'
import Env from './Loader/Env'

const MainCanvas = props => {
  const { state, dispatch } = useContext(DesignerContext)

  const [wheel, setWheel] = useState()
  const [rim, setRim] = useState()
  const [accessories, setAccessories] = useState()

  useEffect(() => {
    axios.get('/api/defaults').then(i => {
      CONTENT.wheel.read(i.data.whl).then(j => setWheel(j.tyre))
      CONTENT.rims.read(i.data.rim).then(j => setRim(j.model))
      CONTENT.accessories.read(i.data.acc).then(j => setAccessories(j.model))
    })
  }, [])

  return (
    <Canvas camera={{ position: [80, 60, -100], fov: 30 }}>
      <ambientLight intensity={0.3} />
      {/* <pointLight position={[100, 100, 100]} /> */}
      <Env />
      {rim && <GLBLoader path={rim} />}
      {wheel && <GLBLoader path={wheel} />}
      {accessories && <GLBLoader path={accessories} />}
      <Shadow
        scale={[20, 20, 1]}
        opacity={0.8}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <OrbitControls
        target={[0, 30, 0]}
        minDistance={120}
        maxDistance={180}
        enablePan={false}
      />
    </Canvas>
  )
}

export default MainCanvas
