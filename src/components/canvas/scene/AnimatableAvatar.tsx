import React, { useState, useMemo, useEffect, useImperativeHandle, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { loadMixamoAnimation } from '../utils/loadMixamoAnimation.js';

import { useControls, button, folder } from 'leva'
// import { ExportVRMtoGLTF } from '../utils/Export.js';


export interface AnimatableAvatarProps {
  url: string;
  animationUrl: string;
}

export interface AnimatableAvatarRef {
  vrm: VRM;
  animationMixer: THREE.AnimationMixer;
}

export const AnimatableAvatar = React.forwardRef<AnimatableAvatarRef, AnimatableAvatarProps>(({ ...props }, ref) => {
  const { url, animationUrl } = props;
  const [vrm, setVrm] = useState<VRM>(null);

  const [avatarClipAction, setAvatarClipAction] = useState(null);

  const meshRef = useRef();

  // const exportModel = useControls('ExportVRMtoGLTF', {
  //   ExportModel: button((get) => {
  //     if (avatarClipAction == null) { }

  //     ExportVRMtoGLTF(avatarClipAction, meshRef.current)
  //     // ExportVRMtoGLTF(avatarClipAction,meshRef.current)
  //     console.log("avatarClipActiona", avatarClipAction)
  //     console.log("meshRef", meshRef.current)
  //   }),
  //   // ResetAction: button((get) => {
  //   //   alert(`Number value is `)

  //   // })
  // })

  const animationMixer = useMemo<THREE.AnimationMixer>(() => {
    if (!animationUrl || !vrm) {
      return null;
    }

    const mixer = new THREE.AnimationMixer(vrm.scene);

    const applyDisplacement = false
    loadMixamoAnimation(animationUrl, vrm, applyDisplacement).then((clip) => {
      setAvatarClipAction(clip);
      mixer.clipAction(clip).play();
      console.log("AnimationClip", mixer.clipAction(clip));
    });

    return mixer;
  }, [animationUrl, vrm]);

  useEffect(() => {
    if (!url) {
      return;
    }

    const loader = new GLTFLoader();
    loader.crossOrigin = 'anonymous';

    loader.register((parser) => {
      return new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true });
    });

    loader.load(
      url,
      (gltf) => {
        const vrm = gltf.userData.vrm;

        if (!vrm) {
          return;
        }

        setVrm(vrm);
        VRMUtils.deepDispose(vrm.scene);

        vrm.scene.traverse((obj: THREE.Object3D) => {
          obj.frustumCulled = false;
        });

        VRMUtils.rotateVRM0(vrm);
        console.log(vrm);
      },
      (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),
      (error) => console.error(error),
    );
  }, [url]);

  useImperativeHandle(ref, () => ({ vrm, animationMixer }), [vrm, animationMixer]);

  useFrame((_, deltaTime) => {
    animationMixer?.update(deltaTime);
    vrm?.update(deltaTime);
  });

  if (vrm) {
    vrm.scene.children.forEach((mesh, i) => {
      // mesh.castShadow = true;
      // mesh.receiveShadow = true;
    })

    vrm.scene.name = 'REMAvatar';
    // vrm.scene.name = 'Normalized_hips';
    return <primitive ref={meshRef} castShadow receiveShadow position={[0, -1, 0]} object={vrm.scene} />
  }

  // return vrm && <primitive object={vrm.scene} />
});
AnimatableAvatar.displayName = 'AnimatableAvatar';
