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
              return (val + iter) / (end / 3 - 1)
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
  // const [data, setData] = useState()
  const [texture, setTexture] = useState()

  const [centroid, setCentroid] = useState()

  const centroidRef = element => {
    setCentroid(element)
  }

  useEffect(() => {
    const initialize = async () => {
      const c_data = await BasicLoader(await store.getFileUrl(props.path))
      setModel(initializeStickerMeshData(c_data))
      // setData(c_data)
      const texture_path = await store.getFileUrl(props.texture)
      var texture_map = new THREE.TextureLoader().load(texture_path)
      console.log(texture_map, texture_path)
      texture_map.wrapS = THREE.ClampToEdgeWrapping
      texture_map.wrapT = THREE.ClampToEdgeWrapping
      texture_map.minFilter = THREE.LinearFilter
      texture_map.magFilter = THREE.NearestFilter
      setTexture(texture_map)
    }
    if (props.path && props.texture) {
      initialize()
    }
  }, [props.path, props.texture])

  const material = new THREE.MeshPhysicalMaterial({
    roughness: 0.3,
    side: THREE.DoubleSide,
    map: texture,
    emissive: '#ffffff',
    emissiveMap: texture,
    emissiveIntensity: 0.4,
    premultipliedAlpha: true,
    transparent: true,
    envMap: scene.environment,
  })

  const final_mesh = model && (
    <group position={model.c} scale={[1, 1, -1]}>
      {[...Array(parseInt((props.range[1] - props.range[0]) / 3)).keys()].map(
        i => {
          return (
            <group
              rotation={[
                THREE.MathUtils.degToRad(3 * i + props.range[0]),
                0,
                Math.PI,
              ]}
              key={`${i}-${props.range[1] - props.range[1]}`}
            >
              <mesh>
                <BufferGeoCustom
                  data={model}
                  material={material}
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
