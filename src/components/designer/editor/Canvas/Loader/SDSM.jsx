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

import { useThree, useLoader } from 'react-three-fiber'
const BufferGeoCustom = ({ data, material, uvOffset }) => {
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
      geo_curr.setAttribute(
        'uv',
        new THREE.Float32BufferAttribute(
          data.uv.map((i, j) => {
            if (j % 2) {
              return i
            } else {
              const iter = uvOffset[0]
              const end = uvOffset[1]
              const val = i
              return (val + iter) / (end / 2.5 - 1)
            }
          }),
          2
        )
      )
      geo_curr.parent.material = material
    }
  }, [geo, uvOffset])

  return <bufferGeometry Name="Model" attach="geometry" ref={geoRef} />
}

const SDSM = props => {
  const { scene } = useThree()
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
  var texture = new THREE.TextureLoader().load('/CompanyLogo.png')
  const Material = new THREE.MeshPhysicalMaterial({
    roughness: 0.6,
    side: THREE.DoubleSide,
    map: texture,
    premultipliedAlpha: true,
    transparent: true,
    envMap: scene.environment,
    needsUpdate: true,
  })

  const final_mesh = model && (
    <group position={model.c}>
      {[...Array(parseInt((props.range[1] - props.range[0]) / 2.5)).keys()].map(
        i => {
          return (
            <group
              rotation={[
                THREE.MathUtils.degToRad(3 * i + props.range[0]),
                0,
                Math.PI,
              ]}
            >
              <mesh>
                <BufferGeoCustom
                  data={model}
                  material={Material}
                  uvOffset={[i, props.range[1] - props.range[0]]}
                />
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
