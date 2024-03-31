import React, { useState, useMemo, useEffect, useRef, useCallback, Suspense, Component } from 'react';
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { AnimatableAvatar, AnimatableAvatarRef } from './AnimatableAvatar';
// import { AnimatableAvatar, AnimatableAvatarRef } from './configAvatarPartsCothFixMTooM';
import * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';

import actionDatas from '../config/actions.json';
import modelDatas from '../config/models.json';

import { useControls, button, folder } from 'leva'
/*
inspired by https://twitter.com/yeemachine/status/1414993821583118341
*/

// const CustomCamera = React.memo(({ ...props }) => {
//   const virtualCamera = useRef<THREE.Camera>()

//   return (
//     <>
//       <PerspectiveCamera name="FBO Camera" ref={virtualCamera} position={[0.0, 1.0, 5.0]} fov={30} aspect={window.innerWidth / window.innerHeight} near={0.1} far={20} />
//       <OrbitControls camera={virtualCamera.current} {...props} screenSpacePanning={true} target={[0.0, 1.0, 0.0]} />
//     </>
//   )
// })


export default function App({ ...props }) {

  const funA = () => {
    console.log("funA")
  }

  const funB = () => {
    console.log("funB")
  }

  // const [modelUrl, setModelUrl] = useState('/three-vrm-girl.vrm')

  const [modelUrl, setModelUrl] = useState('/assets/model/SEE2_TEST_REM_Coth.vrm')
  // const [modelUrl, setModelUrl] = useState('/assets/model/SEE2_TEST_NEW_V0_V1_3.6.0(4_UV_P3img).vrm')
  // const [modelUrl, setModelUrl] = useState('/assets/model/Clothes_DICAYS_T.vrm')
  // const [modelUrl, setModelUrl] = useState('/assets/model/V0_0913.vrm.vrm')
  const [animationUrl, setAnimationUrl] = useState('/assets/animations/Taunt.fbx');
  // const [actionsList, setActionsList] = useState([{ name: 'Default', file: 'Taunt.fbx' }, { name: 'Sitting', file: 'Sitting Laughing.fbx' }]);
  const [actionsList, setActionsList] = useState(actionDatas);
  const [modelsList, setModelsList] = useState(modelDatas);


  // useEffect(() => {
  //   const fetchActions = async () => {
  //     try {
  //       const response = await fetch('actions/actions.json');
  //       const data = await response.json();
  //       console.log('actions.json:', data);
  //       setActionsList(data);
  //     } catch (error) {
  //       console.error('Error fetching actions JSON:', error);
  //     }
  //   };

  //   fetchActions();
  // }, []);
  const actionsOptions = actionsList.reduce<{ [key: string]: { name: string, file: string } }>((options, action) => {
    options[action.name] = action;
    return options;
  }, {});

  const actionsControl = useControls('Actions', {
    selectedAction: { options: actionsOptions },
  });

  const modelsOptions = modelsList.reduce<{ [key: string]: { name: string, file: string } }>((options, model) => {
    options[model.name] = model;
    return options;
  }, {});

  const modelsControl = useControls('Models', {
    selectedModel: { options: modelsOptions },
  });

  const animationAvatarRef = useRef<AnimatableAvatarRef>(null);

  // const values = useControls('Actions', {
  //   selectedAction: select(actionsList[0], actionsList, { label: 'Select Action' })
  // });

  useEffect(() => {
    if (modelsControl.selectedModel) {
      // setModelUrl(modelsControl.selectedModel.file);
    }
  }, [modelsControl.selectedModel]);


  useEffect(() => {
    if (actionsControl.selectedAction) {
      setAnimationUrl(actionsControl.selectedAction.file);
    }
  }, [actionsControl.selectedAction]);


  useEffect(() => {
    function handleDragOver(event: DragEvent) {
      event.preventDefault();
    }

    function handleDrop(event: DragEvent) {
      event.preventDefault();

      const files = event.dataTransfer.files;
      if (!files) return;

      const file = files[0];
      if (!file) return;

      const fileType = file.name.split('.').pop();
      const blob = new Blob([file], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);

      if (fileType === 'fbx') {
        setAnimationUrl(url);
      } else {
        setModelUrl(url);
      }
    }

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    }
  }, [])

  useEffect(() => {
    if (!animationAvatarRef.current?.vrm) {
      return;
    }

    const { vrm } = animationAvatarRef.current;
    vrm.humanoid.getNormalizedBoneNode('leftUpperArm')!.rotation.z = 0.25 * Math.PI
    // vrm.humanoid?.getNormalizedBoneNode('leftUpperArm')?.traverse((node: THREE.Mesh) => {
    //   if (node.isMesh) {
    //     node.castShadow = true;
    //     node.receiveShadow = true;
    //   }
    // });
  }, []);

  return (
    <Suspense fallback={null}>
      {/* <AnimatableAvatar url={modelUrl} animationUrl={animationUrl} ref={animationAvatarRef}  /> */}
      <AnimatableAvatar {...props} url={modelUrl} animationUrl={animationUrl} ref={animationAvatarRef} />
      {/* <AnimatableAvatar url={'/REM測試人員01 VRM0只有衣服.vrm'} animationUrl={animationUrl} ref={animationAvatarRef} position={[1, 0, 0]} />
      <AnimatableAvatar url={'/REM測試人員01 VRM0只有身體.vrm'} animationUrl={animationUrl} ref={animationAvatarRef} position={[1, 0, 0]} />
      <AnimatableAvatar url={'/REM測試人員01 VRM0只有頭髮.vrm'} animationUrl={animationUrl} ref={animationAvatarRef} position={[1, 0, 0]} /> */}
    </Suspense>
  )
}
