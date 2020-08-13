import React, { useState, useEffect, Suspense } from 'react'
import { useGLTFLoader } from 'drei'

import store from '../../../../../functions/store'

function Model({ path }) {
  const { scene } = useGLTFLoader(path, true)

  return <primitive object={scene} dispose={null} />
}

function LoaderScene({ path }) {
  const [modelPath, setModelPath] = useState()

  useEffect(() => {
    store.getFileUrl(path).then(i => setModelPath(i))
  }, [])

  return (
    <Suspense fallback={null}>
      {modelPath && <Model path={modelPath} />}
    </Suspense>
  )
}

export default LoaderScene
