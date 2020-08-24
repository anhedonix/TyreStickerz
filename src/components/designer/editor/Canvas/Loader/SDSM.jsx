/**
 * React components that handle the SDM File
 * This file is used at Saddles India For Representing 3D Models
 * This makes heavy use of ThreeJs and React-Three-Fiber
 * Created by Anand Magaji <anand@eosacro.com>
 */
import BasicLoader from './BasicLoader'

import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import initializeStickerMeshData from './initializeData'
import store from '../../../../../functions/store'

const BufferGeoCustom = ({ data, material }) => {
  const [geo, setGeo] = useState()

  const geoRef = element => {
    setGeo(element)
  }

  useEffect(() => {
    if (geo) {
      const geo_curr = geo
      geo_curr.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(data.p, 3)
      )
      geo_curr.setAttribute(
        'normal',
        new THREE.Float32BufferAttribute(data.n, 3)
      )
      geo_curr.setAttribute('uv', new THREE.Float32BufferAttribute(data.uv, 2))
      geo_curr.parent.material = material
    }
  }, [geo])

  return <bufferGeometry Name="Model" attach="geometry" ref={geoRef} />
}

const SDSM = props => {
  const [model, setModel] = useState()
  const [data, setData] = useState()

  const [centroid, setCentroid] = useState()

  const centroidRef = element => {
    setCentroid(element)
  }

  useEffect(() => {
    const initialize = async () => {
      const c_data = await BasicLoader(await store.getFileUrl(props.path))
      setModel(initializeStickerMeshData(c_data))
      setData(c_data)
    }
    initialize()
  }, [])

  const Material = new THREE.MeshPhysicalMaterial({
    roughness: 0.6,
    side: THREE.DoubleSide,
  })

  const final_mesh = model && (
    <group position={model.c}>
      {[...Array(parseInt((props.range[1] - props.range[0]) / 2.5)).keys()].map(
        i => {
          return (
            <group
              rotation={[
                THREE.MathUtils.degToRad(2.5 * i + props.range[0]),
                0,
                Math.PI,
              ]}
            >
              <mesh>
                <BufferGeoCustom data={model} material={Material} />
              </mesh>
            </group>
          )
        }
      )}
    </group>
  )

  if (model) {
    return final_mesh
  } else {
    return null
  }
}

export default SDSM
