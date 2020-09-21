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

const BufferGeoCustom = ({ data, material, uvOffset, offset }) => {
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
              return (
                ((i + offset.offsetU - 1 + offset.scaleU) / offset.scaleU) *
                0.99
              )
            } else {
              const iter = uvOffset[0]
              const end = uvOffset[1]
              const val = i
              return (
                (((val + iter) / (end / 3) - offset.offsetV) / offset.scaleV) *
                  0.996 +
                0.002
              )
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

const SDSM = ({ mesh, data, index, length }) => {
  const { scene } = useThree()
  const [ready, setReady] = useState(false)
  const [model, setModel] = useState()
  const [texture, setTexture] = useState()

  useEffect(() => {
    const initialize = async () => {
      const c_data = await BasicLoader(mesh)
      setModel(initializeStickerMeshData(c_data))
      var texture_map = new THREE.TextureLoader().load(data.texture.file)
      texture_map.wrapS = THREE.ClampToEdgeWrapping
      texture_map.wrapT = THREE.ClampToEdgeWrapping
      texture_map.minFilter = THREE.LinearFilter
      texture_map.magFilter = THREE.NearestFilter
      texture_map.encoding = THREE.sRGBEncoding
      setTexture(texture_map)
      setReady(true)
    }
    if (mesh && data) {
      initialize()
    }
  }, [mesh, data])

  const material = () => {
    return new THREE.MeshPhysicalMaterial({
      roughness: 1,
      side: THREE.DoubleSide,
      map: texture,
      emissive: '#ffffff',
      emissiveMap: texture,
      metalness: 0,
      emissiveIntensity: 0.6,
      premultipliedAlpha: true,
      transparent: true,
      envMap: scene.environment,
    })
  }

  const final_mesh = model && (
    <group
      position={[model.c[0] + (length - index) * 0.05, model.c[1], model.c[2]]}
      scale={[1, 1, -1]}
    >
      {[...Array(parseInt(data.length / 3)).keys()].map(i => {
        return (
          <group
            rotation={[
              THREE.MathUtils.degToRad(3 * i + data.start),
              0,
              Math.PI,
            ]}
            key={`${i}-${data.start}`}
          >
            <mesh>
              <BufferGeoCustom
                data={model}
                material={ready && material()}
                uvOffset={[i, data.length]}
                key={i}
                offset={data}
              />
            </mesh>
            {data.mirror && (
              <group
                rotation={[THREE.MathUtils.degToRad(180), 0, 0]}
                key={`${i}-${data.start}`}
              >
                <mesh>
                  <BufferGeoCustom
                    data={model}
                    material={ready && material()}
                    uvOffset={[i, data.length]}
                    key={i}
                    offset={data}
                  />
                </mesh>
              </group>
            )}
          </group>
        )
      })}
    </group>
  )

  if (model) {
    return final_mesh
  } else {
    return null
  }
}

export default SDSM
