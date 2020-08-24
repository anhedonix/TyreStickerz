/**
 * React components that handle the SDM File
 * This file is used at Saddles India For Representing 3D Models
 * This makes heavy use of ThreeJs and React-Three-Fiber
 * Created by Anand Magaji <anand@eosacro.com>
 */

const initializeStickerMeshData = parms => {
  if (!parms.filetype === 'saddles_sticker_mesh') {
    return null
  }
  const init = parms.data
  const verts = init.v
  const pos = init.p
  const nor = init.n
  const uvs = init.uv
  const c = init.c
  let p = []
  let n = []
  let uv = []
  for (let i = 0; i < verts.length; i++) {
    p.push((c[0] - pos[verts[i] * 3 + 0]) / parms.precision_factor)
    p.push((c[1] - pos[verts[i] * 3 + 1]) / parms.precision_factor)
    p.push((c[2] - pos[verts[i] * 3 + 2]) / parms.precision_factor)
    n.push(nor[verts[i] * 3] / parms.precision_factor)
    n.push(nor[verts[i] * 3 + 1] / parms.precision_factor)
    n.push(nor[verts[i] * 3 + 2] / parms.precision_factor)
    uv.push(uvs[verts[i] * 2] / parms.precision_factor)
    uv.push(uvs[verts[i] * 2 + 1] / parms.precision_factor)
  }
  const data = {
    p,
    n,
    uv,
    c: [
      c[0] / parms.precision_factor,
      c[1] / parms.precision_factor,
      c[2] / parms.precision_factor,
    ],
  }
  return data
}

export default initializeStickerMeshData
