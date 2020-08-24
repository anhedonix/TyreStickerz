import React, { useState, useEffect, Suspense, useRef } from 'react'
import { useGLTFLoader } from 'drei'
import {
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter,
  MeshPhysicalMaterial,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useThree, useLoader } from 'react-three-fiber'
import store from '../../../../../functions/store'

const applyProperties = (gltf, scene) => {
  gltf.scene.traverse(child => {
    if (child.isMesh) {
      child.material.envMap = scene.environment
      child.material.reflectivity = 0
      // child.material.map = null
      // child.material.roughness = child.material.roughness / 2
      child.material.clearcoat = 0.1
      child.material.clearcoatRoughness = 0.3
      // child.rotation.y = 22 / 7
      child.material.needsUpdate = true
    }
  })
}

function Model({ path }) {
  const { scene } = useThree()

  const gltf = useLoader(GLTFLoader, path)

  useEffect(() => {
    applyProperties(gltf, scene)
  }, [scene.environment])

  return <primitive object={gltf.scene} />
}

function LoaderScene({ path }) {
  const [modelPath, setModelPath] = useState()

  useEffect(() => {
    store.getFileUrl(path).then(i => setModelPath(i))
  }, [])

  if (modelPath) {
    return (
      <Suspense fallback={null}>
        <Model path={modelPath} />
      </Suspense>
    )
  } else {
    return null
  }
}

export default LoaderScene
