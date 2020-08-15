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
  const [model, setModel] = useState()
  const [modelPath, setModelPath] = useState('')

  const [cluster, setCluster] = useState('')
  const [clusterpath, setClusterpath] = useState([])

  useEffect(() => {
    axios.get('/api/defaults').then(i => {
      setCluster(i.data.rim)
      setModel(i.data.whl)
    })
    axios
      .get('/api/defaults/env')
      .then(i => dispatch({ type: 'setEnv', payload: i.data }))
  }, [])

  useEffect(() => {
    CONTENT.wheel.read(model).then(i => setModelPath(i.tyre))
  }, [model])

  useEffect(() => {
    CONTENT.rims.read(cluster).then(i => {
      const cluster_tmp = []
      if (i.model) {
        Object.keys(i.model).map(key => {
          cluster_tmp.push(i.model[key].model)
        })
      }
      setClusterpath(cluster_tmp)
    })
  }, [cluster])

  return (
    <Canvas camera={{ position: [80, 60, -100], fov: 30 }}>
      <ambientLight intensity={0.3} />
      {/* <pointLight position={[100, 100, 100]} /> */}
      <Env env={state.env} />
      <Suspense fallback={null}>
        {modelPath && <GLBLoader path={modelPath} />}
        {clusterpath && clusterpath.map(p => <GLBLoader path={p} key={p} />)}
      </Suspense>
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
