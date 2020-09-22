import Slider from '@material-ui/core/Slider'
import { OrbitControls, TrackballControls } from 'drei'
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
  currentStickerTemp,
}) => {
  const [init, setInit] = useState(false)

  return (
    <>
      <Canvas camera={{ position: [80, 60, -60], fov: 30 }}>
        <ambientLight intensity={0.2} />
        <Env initialize={() => setInit(true)} />

        {init && (
          <>
            {rim && <GLBLoader path={rim} />}
            {wheel && <GLBLoader path={wheel} envIntensity={2.2} />}
            {accessories && <GLBLoader path={accessories} />}
          </>
        )}

        {stickers.map((sticker_element, i) => {
          if (currentSticker && currentSticker.uid === sticker_element.uid) {
            return null
          } else {
            return (
              <SDSM
                mesh={stickerMesh}
                data={sticker_element}
                key={sticker_element.uid}
                index={i}
                length={stickers.length}
              />
            )
          }
        })}

        {currentSticker && (
          <SDSM
            mesh={stickerMesh}
            data={currentSticker}
            index={0}
            length={stickers.length}
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
