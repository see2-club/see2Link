import * as THREE from 'three'
// import React, { Suspense, useEffect, useRef, useState } from 'react'
// import * as ReactDOM from 'react-dom'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { useFBX, OrbitControls, useGLTF, useTexture, useAnimations, Box, PerspectiveCamera, Plane, useFBO } from '@react-three/drei'


import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { mixamoVRMRigMap } from '../utils/mixamoVRMRigMap.js'



/**
 * Load Mixamo animation, convert for three-vrm use, and return it.
 *
 * @param {string} url A url of mixamo animation data
 * @param {VRM} vrm A target VRM
 * @returns {Promise<THREE.AnimationClip>} The converted AnimationClip
 */
export function loadMixamoAnimation(url, vrm, applyDisplacement) {
  const loader = new FBXLoader() // A loader which loads FBX
  return loader.loadAsync(url).then((asset) => {
    if (asset.animations.length === 0) {
      throw new Error('No animation found')
    }
    const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com') // extract the AnimationClip

    const tracks = [] // KeyframeTracks compatible with VRM will be added here

    const restRotationInverse = new THREE.Quaternion()
    const parentRestWorldRotation = new THREE.Quaternion()
    const _quatA = new THREE.Quaternion()
    const _vec3 = new THREE.Vector3()

    console.log("vrm", vrm);

    console.log("asset:", asset);

    // Adjust with reference to hips height.
    // const motionHipsHeight = asset.getObjectByName('mixamorigHips').position.y
    const mixamoHipsObject = asset.getObjectByName('mixamorigHips');
    console.log("mixamorigHips object:", mixamoHipsObject);
    let motionHipsHeight = mixamoHipsObject?.position?.y;
    console.log("mixamorigHips object:Y", motionHipsHeight);
    if (motionHipsHeight === undefined) {
      console.error("Could not find the 'mixamorigHips' object or its position is undefined.");
      motionHipsHeight = 394.79594926657575;
    }

    const vrmHipsY = vrm.humanoid?.getNormalizedBoneNode('hips').getWorldPosition(_vec3).y
    console.log("vrmHipsY", vrmHipsY);
    const vrmRootY = vrm.scene.getWorldPosition(_vec3).y
    const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY)
    const hipsPositionScale = vrmHipsHeight / motionHipsHeight

    if (!applyDisplacement) {
      // 如果 applyDisplacement 為 false，則修改或刪除與位移相關的軌道。
      clip.tracks = clip.tracks.filter(track => {
        // 這裡是一個基本的例子，您需要根據您的具體需求來決定如何過濾或修改軌道。
        return !track.name.includes('position');
      });
    }
    clip.tracks.forEach((track) => {
      // Convert each tracks for VRM use, and push to `tracks`
      const trackSplitted = track.name.split('.')
      const mixamoRigName = trackSplitted[0]
      const vrmBoneName = mixamoVRMRigMap[mixamoRigName]
      const vrmNodeName = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)?.name
      const mixamoRigNode = asset.getObjectByName(mixamoRigName)

      if (vrmNodeName != null) {
        const propertyName = trackSplitted[1]

        // Store rotations of rest-pose.
        mixamoRigNode.getWorldQuaternion(restRotationInverse).invert()
        mixamoRigNode.parent.getWorldQuaternion(parentRestWorldRotation)

        if (track instanceof THREE.QuaternionKeyframeTrack) {
          // Retarget rotation of mixamoRig to NormalizedBone.
          for (let i = 0; i < track.values.length; i += 4) {
            const flatQuaternion = track.values.slice(i, i + 4)

            _quatA.fromArray(flatQuaternion)

            // 親のレスト時ワールド回転 * トラックの回転 * レスト時ワールド回転の逆
            _quatA.premultiply(parentRestWorldRotation).multiply(restRotationInverse)

            _quatA.toArray(flatQuaternion)

            flatQuaternion.forEach((v, index) => {
              track.values[index + i] = v
            })
          }

          tracks.push(
            new THREE.QuaternionKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v))
            )
          )
        } else if (track instanceof THREE.VectorKeyframeTrack) {
          const value = track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * hipsPositionScale)
          tracks.push(new THREE.VectorKeyframeTrack(`${vrmNodeName}.${propertyName}`, track.times, value))
        }
      }
    })

    return new THREE.AnimationClip('vrmAnimation', clip.duration, tracks)
  })
}
