import Slider from '@material-ui/core/Slider'
import { OrbitControls, TrackballControls, Shadow } from 'drei'
import React, { useEffect, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import Env from './Loader/Env'
import GLBLoader from './Loader/GLBLoader'
import SDSM from './Loader/SDSM'

const MainCanvas = ({
  rim,
  wheel,
  accessories,
  stickers,
  stickerMesh,
  currentSticker,
}) => {
  const [init, setInit] = useState(false)

  return (
    <>
      <Canvas camera={{ position: [80, 60, -100], fov: 30 }}>
        <ambientLight intensity={0.2} />
        <Env initialize={() => setInit(true)} />

        {init && (
          <>
            {rim && <GLBLoader path={rim} />}
            {wheel && <GLBLoader path={wheel} envIntensity={2.2} />}
            {accessories && <GLBLoader path={accessories} />}
          </>
        )}

        {stickers.map((el, i) => {
          if (currentSticker && currentSticker.uid === el.uid) {
            return null
          } else {
            return <SDSM mesh={stickerMesh} data={el} key={el.uid} index={i} />
          }
        })}

        {currentSticker && (
          <SDSM
            mesh={stickerMesh}
            data={currentSticker}
            index={stickers.length}
          />
        )}

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
    </>
  )
}

export default MainCanvas
