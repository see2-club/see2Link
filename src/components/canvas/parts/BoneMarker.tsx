import React, { useEffect, useRef } from 'react';
import { Mesh, SphereGeometry, MeshBasicMaterial, Object3D } from 'three';
import * as THREE from 'three'

interface BoneMarkerProps {
  bone: Object3D;
  depth: number;
  maxDepth: number;
}

export const BoneMarker: React.FC<BoneMarkerProps> = ({ bone, depth, maxDepth }) => {
  // console.log("BoneMarker", bone)
  const sphereRef = useRef<Mesh>(null);

  useEffect(() => {
    // const sphereSize = 0.02 - (depth * 0.025);
    const sphereSize = 0.1 - ((depth / maxDepth) * (0.1 - 0.015));
    const sphere = new Mesh(
      new SphereGeometry(sphereSize),
      new MeshBasicMaterial({ color: 0xffa500, transparent: true, opacity: 0.5 })
    );

    const handleClick = () => {
      if (sphereRef.current) {
        (sphereRef.current.material as THREE.MeshBasicMaterial).color.set(0x0000ff);
      }
    };

    sphere.addEventListener('pointerdown', handleClick);
    // bone.add(sphere);
    if (bone) {
      bone.add(sphere);
    }
    sphereRef.current = sphere;

    return () => {
      sphere.removeEventListener('pointerdown', handleClick);
      bone.remove(sphere);
    };
  }, [bone]);

  return null;
};
