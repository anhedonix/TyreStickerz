import axios from 'axios'
import { OrbitControls, Shadow } from 'drei'
import React, { useEffect, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import * as CONTENT from '../../../../constants/contentTypes'
import Env from './Loader/Env'
import GLBLoader from './Loader/GLBLoader'

const MainCanvas = () => {
  const [init, setInit] = useState(false)
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
      <Env initialize={() => setInit(true)} />
      {init && rim && <GLBLoader path={rim} />}
      {init && wheel && <GLBLoader path={wheel} />}
      {init && accessories && <GLBLoader path={accessories} />}
      {init && (
        <Shadow
          scale={[20, 20, 1]}
          opacity={0.8}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      )}
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
