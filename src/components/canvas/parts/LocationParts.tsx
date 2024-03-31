import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { VRM } from '@pixiv/three-vrm';
import { useControls } from 'leva';
import * as THREE from 'three'

interface LocationPartsProps {
  avatar: React.MutableRefObject<VRM>;
  bonesStore: { [part: string]: THREE.Object3D };
}
const json = [
  { "name": "Default", "file": '/location-parts/Glasses02.glb', },
  { "name": "Glasses01", "file": '/location-parts/Glasses01.glb', }
];

const LocationParts: React.FC<LocationPartsProps> = ({ avatar, bonesStore }) => {
  const { scene } = useThree();
  const [Glasses_modelUrl, setGlassesModelUrl] = React.useState('/location-parts/Glasses01.glb');
  const LocationPartsGLTF = useGLTF(Glasses_modelUrl);

  const positionOffset = useControls({
    position: { x: 0, y: 0, h: -0.07 },
    rotation: { x: 0, y: Math.PI, h: 0 },
    // position: { value: [0, 0, 0], hint: 'Position of the object relative to the screen' },
    size: {
      min: 0.1,
      max: 20,
      value: 1.2,
      step: 0.1,
    }
  })

  useEffect(() => {
    if (avatar.current && LocationPartsGLTF) {
      if (bonesStore.head) {
        bonesStore.head.add(LocationPartsGLTF.scene);
        LocationPartsGLTF.scene.position.set(positionOffset.position.x, positionOffset.position.y, positionOffset.position.h);
        LocationPartsGLTF.scene.rotation.set(positionOffset.rotation.x, positionOffset.rotation.y, positionOffset.rotation.h);
        LocationPartsGLTF.scene.scale.set(positionOffset.size, positionOffset.size, positionOffset.size);
      }
    }
  }, [scene, avatar, LocationPartsGLTF, positionOffset]);

  return null;
};

export type LocationPartsType = typeof LocationParts;

export default LocationParts;
