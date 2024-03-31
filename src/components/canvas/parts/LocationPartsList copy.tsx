import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { VRM } from '@pixiv/three-vrm';
import { useControls, folder } from 'leva';
import { OrbitControls, TransformControls, useCursor } from '@react-three/drei'
import create from 'zustand'
import * as THREE from 'three';

import { Object3D } from 'three';

interface Store {
  target: Object3D | null;
  setTarget: (target: Object3D | null) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  target: null,
  setTarget: (target: Object3D | null) => set({ target }),
  isDragging: false,
  setIsDragging: (isDragging: boolean) => set({ isDragging }),
}));
// const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

interface LocationPartsProps {
  avatar: React.MutableRefObject<VRM>;
  bonesStore: { [part: string]: THREE.Object3D };
  modelUrl: string;
  name: string;
  mode: "translate" | "rotate" | "scale";
}

interface LocationPartsListProps {
  avatar: React.MutableRefObject<VRM>;
  bonesStore: { [part: string]: THREE.Object3D };
}

const json = [
  { "name": "Default", "file": '/location-parts/Glasses02.glb' },
  // { "name": "Glasses01", "file": '/location-parts/Glasses01.glb' },
  // { "name": "Hair01", "file": '/location-parts/Hair01.glb' },
  // { "name": "Hair01", "file": '/location-parts/Hair01.glb' },
  // { "name": "Hair02", "file": '/location-parts/Hair02.glb' },
  // { "name": "Hair03", "file": '/location-parts/Hair03.glb' },
  // { "name": "Hair04", "file": '/location-parts/Hair04.glb' },
];


const LocationPart: React.FC<LocationPartsProps> = ({ avatar, bonesStore, modelUrl, name, mode }) => {
  const setTarget = useStore((state) => state.setTarget);
    const setIsDragging = useStore((state) => state.setIsDragging);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { scene, camera, gl } = useThree();
  const LocationPartsGLTF = useGLTF(modelUrl);

  const positionOffset = useControls(name, {
    'LocationParts': folder({
      visible: false,
      position: { x: 0, y: -0.29, z: 0.2 },
      rotation: { x: 0, y: 0, z: Math.PI },
      size: {
        min: 0.1,
        max: 20,
        value: 2,
        step: 0.1,
      },
    }, { collapsed: true })
  });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (avatar.current && LocationPartsGLTF) {
      if (bonesStore.head) {
        bonesStore.head.add(LocationPartsGLTF.scene);
        LocationPartsGLTF.scene.position.set(positionOffset.position.x, positionOffset.position.z, positionOffset.position.y);
        LocationPartsGLTF.scene.rotation.set(positionOffset.rotation.x, positionOffset.rotation.z, positionOffset.rotation.y);
        LocationPartsGLTF.scene.scale.set(positionOffset.size, positionOffset.size, positionOffset.size);
        LocationPartsGLTF.scene.visible = positionOffset.visible;
      }
    }
  }, [scene, avatar, LocationPartsGLTF, positionOffset]);

  useEffect(() => {
    if (LocationPartsGLTF && LocationPartsGLTF.scene) {
      const handlePointerOver = () => {
        setHovered(true);
      };
  
      const handlePointerOut = () => {
        setHovered(false);
      };
  
      LocationPartsGLTF.scene.addEventListener('pointerover', handlePointerOver);
      LocationPartsGLTF.scene.addEventListener('pointerout', handlePointerOut);
  
      return () => {
        LocationPartsGLTF.scene.removeEventListener('pointerover', handlePointerOver);
        LocationPartsGLTF.scene.removeEventListener('pointerout', handlePointerOut);
      };
    }
  }, [LocationPartsGLTF]);
  
  return (
    <>
      <TransformControls
        enabled={true} // Enable the TransformControls always
        space="local"
        scale={2}
        rotationSnap={Math.PI / 12}
        translationSnap={0.1}
        size={0.5}
        showX
        showY
        showZ
        object={LocationPartsGLTF ? LocationPartsGLTF.scene : null}
        mode={mode} // Set the mode from the controls
        /* @ts-ignore */ 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    </>
  );
};


const LocationPartsList: React.FC<LocationPartsListProps> = (props) => {
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } }) as { mode: "translate" | "rotate" | "scale" };

  return (
    <>
      {json.map((item, index) => (
        <LocationPart key={index} {...props} modelUrl={item.file} name={item.name} mode={mode} />
      ))}
    </>
  );
};

export default LocationPartsList;
