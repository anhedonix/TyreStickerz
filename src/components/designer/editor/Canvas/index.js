import React, { useRef, useEffect, useState, useContext } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import axios from 'axios'
import GLBLoader from './Loader/GLBLoader'
import { OrbitControls } from 'drei'

import * as CONTENT from '../../../../constants/contentTypes'

import { DesignerContext } from '../../../../states/designer'

function Box(props) {
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  )
}

const MainCanvas = props => {
  const { state } = useContext(DesignerContext)
  const [model, setModel] = useState()
  const [modelPath, setModelPath] = useState('')

  useEffect(() => {
    axios.get('/api/defaults').then(i => setModel(i.data.whl))
  }, [])

  useEffect(() => {
    CONTENT.wheel.read(model).then(i => setModelPath(i.tyre))
  }, [model])

  return (
    <Canvas ref={MainCanvas}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls />
      {modelPath && <GLBLoader path={modelPath} />}
    </Canvas>
  )
}

export default MainCanvas
