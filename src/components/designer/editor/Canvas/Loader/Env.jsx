import axios from 'axios'
import { useEffect } from 'react'
import { useThree } from 'react-three-fiber'
import * as THREE from 'three'
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader'
import store from '../../../../../functions/store'

const Env = ({ initialize }) => {
  const { scene, gl } = useThree()

  useEffect(() => {
    axios.get('/api/defaults/env').then(async i => {
      const px = await store.getFileUrl(i.data.px)
      const nx = await store.getFileUrl(i.data.nx)
      const py = await store.getFileUrl(i.data.py)
      const ny = await store.getFileUrl(i.data.ny)
      const pz = await store.getFileUrl(i.data.pz)
      const nz = await store.getFileUrl(i.data.nz)

      const maps = [px, nx, py, ny, pz, nz]

      const hdrCubeMap = new HDRCubeTextureLoader()
        .setDataType(THREE.UnsignedByteType)
        .load(maps, () => {
          hdrCubeMap.minFilter = THREE.LinearMipMapLinearFilter
          hdrCubeMap.magFilter = THREE.LinearFilter
          hdrCubeMap.generateMipmaps = true
          hdrCubeMap.needsUpdate = true

          gl.toneMapping = THREE.LinearToneMapping
          gl.toneMappingExposure = 1
          gl.physicallyCorrectLights = true
          gl.outputEncoding = THREE.sRGBEncoding
          gl.setPixelRatio = 2

          // gl.shadowMap.enabled = true;
          // gl.shadowMap.bias = 0.0001;
          // gl.shadowMap.type = THREE.PCFSoftShadowMap;

          scene.environment = hdrCubeMap
          // scene.background = hdrCubeMap

          initialize()
        })
    })
  }, [])

  return null
}

export default Env
