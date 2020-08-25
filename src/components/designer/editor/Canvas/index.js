import Slider from '@material-ui/core/Slider'
import axios from 'axios'
import { OrbitControls, TrackballControls, Shadow } from 'drei'
import React, { useEffect, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import * as CONTENT from '../../../../constants/contentTypes'
import Env from './Loader/Env'
import GLBLoader from './Loader/GLBLoader'
import SDSM from './Loader/SDSM'

const MainCanvas = () => {
  const [init, setInit] = useState(false)
  const [wheel, setWheel] = useState()
  const [sticker, setSticker] = useState()
  const [rim, setRim] = useState()
  const [accessories, setAccessories] = useState()
  const [range, setRange] = useState([45, 135])

  useEffect(() => {
    axios.get('/api/defaults').then(i => {
      CONTENT.wheel.read(i.data.whl).then(j => {
        setWheel(j.tyre)
        setSticker(j.stickerMesh)
      })
      CONTENT.rims.read(i.data.rim).then(j => setRim(j.model))
      CONTENT.accessories.read(i.data.acc).then(j => setAccessories(j.model))
    })
  }, [])

  const handleChange = (event, newValue) => {
    setRange(newValue)
  }

  return (
    <>
      <Canvas camera={{ position: [80, 60, -100], fov: 30 }}>
        <ambientLight intensity={0.2} />
        <Env initialize={() => setInit(true)} />
        {init && (
          <>
            {rim && <GLBLoader path={rim} />}
            {wheel && <GLBLoader path={wheel} />}
            {accessories && <GLBLoader path={accessories} />}{' '}
          </>
        )}
        {sticker && <SDSM path={sticker} range={range} />}
        {init && (
          <Shadow
            scale={[40, 40, 1]}
            opacity={0.8}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        )}
        {/* <TrackballControls noPan={true} target={[0, 30, 0]} /> */}
        <OrbitControls
          target={[0, 30, 0]}
          minDistance={120}
          maxDistance={220}
          enablePan={false}
        />
      </Canvas>
      <Slider
        value={range}
        onChange={handleChange}
        min={0}
        max={420}
        step={3}
        valueLabelDisplay="auto"
      />
    </>
  )
}

export default MainCanvas
