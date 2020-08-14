import React, { useContext, useEffect, useState } from 'react'
import { useThree } from 'react-three-fiber'
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { PMREMGenerator } from 'three'
import * as THREE from 'three'

import { DesignerContext } from '../../../../../states/designer'

const Env = props => {
  const { scene, gl } = useThree()

  const hdrCubeMap = new HDRCubeTextureLoader()
    .setDataType(THREE.UnsignedByteType)
    .load(
      [
        props.env.px,
        props.env.nx,
        props.env.py,
        props.env.ny,
        props.env.pz,
        props.env.nz,
      ],
      () => {
        hdrCubeMap.magFilter = THREE.LinearFilter
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
        scene.refMap = hdrCubeMap
        // scene.background = hdrCubeMap
      }
    )

  return null
}

export default Env
