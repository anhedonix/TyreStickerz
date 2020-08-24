/**
 * React components that handle the SDM File
 * This file is used at Saddles India For Representing 3D Models
 * This makes heavy use of ThreeJs and React-Three-Fiber
 * Created by Anand Magaji <anand@eosacro.com>
 */
import BasicLoader from '../BasicLoader'

import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import initializeStickerMeshData from '../initializeData'
import store from '../../../../functions/store'

const SDSM = props => {
  const [model, setModel] = useState()
  const [geo, setGeo] = useState()

  const geoRef = element => {
    setGeo(element)
  }

  useEffect(() => {
    const initialize = async () => {
      setModel(
        initializeStickerMeshData(
          await BasicLoader(await store.getFileUrl(props.path))
        )
      )
    }
    initialize()
  }, [])

  useEffect(() => {
    if (geo) {
      const geo_curr = geo
      geo_curr.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(model.p, 3)
      )
      geo_curr.setAttribute(
        'normal',
        new THREE.Float32BufferAttribute(model.n, 3)
      )
      geo_curr.setAttribute('uv', new THREE.Float32BufferAttribute(model.uv, 2))
      geo_curr.computeBoundingSphere()
      console.log(geo_curr)
    }
  }, [geo, model])

  if (model) {
    return (
      <mesh>
        <bufferGeometry Name="Model" attach="geometry" ref={geoRef} />
        <meshPhysicalMaterial
          roughness={0.6}
          metalness={0}
          side={THREE.DoubleSide}
          attach="material"
          color={'#ffffff'}
          emissive={'#000000'}
          emissiveIntensity={0}
        />
      </mesh>
    )
  } else {
    return null
  }
}

export default SDSM
