'use client'

import React, { useState, useMemo, useEffect, useImperativeHandle, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { VRM, VRMLoaderPlugin, VRMUtils, VRMHumanBoneName } from '@pixiv/three-vrm';
import { loadMixamoAnimation } from '../utils/loadMixamoAnimation.js';

import { useControls, button, folder, } from 'leva'
import { Object3D } from 'three'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center, Clone } from '@react-three/drei'

// import VRMMetadataPanel from './VRMMetadataPanel';
// import LocationParts from './Parts/LocationParts'; // 引入新的 LocationParts 组件
import LocationPartsList from '../parts/LocationPartsList'; // 引入新的 LocationPartsList 组件
import { BoneMarker } from '../parts/BoneMarker';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';


export interface AnimatableAvatarProps {
  url: string;
  animationUrl: string;
  position?: [number, number, number];
}

export interface AnimatableAvatarRef {
  vrm: VRM;
  animationMixer: THREE.AnimationMixer;
}

export const AnimatableAvatar = React.forwardRef<AnimatableAvatarRef, AnimatableAvatarProps>((props, ref) => {

  const [isPlayAction, setPlayAction] = useState(null);
  const [vrmMetadata, setVrmMetadata] = useState(null);

  const [{ }, set] = useControls('Metadata',
    () => ({
      name: {
        label: 'Allowed User Name',
        value: 'allowedUserName',
        onChange: (c) => {
          set({ name: vrmMetadata?.allowedUserName });
        },
      },
      author: {
        label: 'Author',
        value: '',
        onChange: (c) => {
          set({ author: vrmMetadata?.author });
        },
      },
      commercialUsageName: {
        label: 'Commercial Usage Name',
        value: '',
        onChange: (c) => {
          set({ commercialUsageName: vrmMetadata?.commercialUsageName });
        },
      },
      contactInformation: {
        label: 'Contact Information',
        value: '',
        onChange: (c) => {
          set({ contactInformation: vrmMetadata?.contactInformation });
        },
      },
      licenseName: {
        label: 'License Name',
        value: '',
        onChange: (c) => {
          set({ licenseName: vrmMetadata?.licenseName });
        },
      },
      metaVersion: {
        label: 'Meta Version',
        value: '',
        onChange: (c) => {
          set({ metaVersion: vrmMetadata?.metaVersion });
        },
      },
      otherLicenseUrl: {
        label: 'Other License URL',
        value: '',
        onChange: (c) => {
          set({ otherLicenseUrl: vrmMetadata?.otherLicenseUrl });
        },
      },
      otherPermissionUrl: {
        label: 'Other Permission URL',
        value: '',
        onChange: (c) => {
          set({ otherPermissionUrl: vrmMetadata?.otherPermissionUrl });
        },
      },
      reference: {
        label: 'Reference',
        value: '',
        onChange: (c) => {
          set({ reference: vrmMetadata?.reference });
        },
      },
      sexualUsageName: {
        label: 'Sexual Usage Name',
        value: '',
        onChange: (c) => {
          set({ sexualUsageName: vrmMetadata?.sexualUsageName });
        },
      },
      title: {
        label: 'Title',
        value: '',
        onChange: (c) => {
          set({ title: vrmMetadata?.title });
        },
      },
      version: {
        label: 'Version',
        value: '',
        onChange: (c) => {
          set({ version: vrmMetadata?.version });
        },
      },
      violentUsageName: {
        label: 'Violent Usage Name',
        value: '',
        onChange: (c) => {
          set({ violentUsageName: vrmMetadata?.violentUsageName });
        },
      },
    }),
    [vrmMetadata]
  );

  const { ...controls } = useControls('controls', {
    Head: { value: 0, min: -0.4, max: 0.4 },
    Spine: { value: 0, min: -0.4, max: 0.4 },
    leftArm: { value: 0, min: -0.4, max: 0.4 },
    rightArm: { value: 0, min: -0.4, max: 0.4 },
    leftLowerArm: { value: 0, min: -0.4, max: 0.4 },
    rightLowerArm: { value: 0, min: -0.4, max: 0.4 },
    leftHand: { value: 0, min: -0.4, max: 0.4 },
    rightHand: { value: 0, min: -0.4, max: 0.4 },
    leftUpperLeg: { value: 0, min: -0.4, max: 0.4 },
    rightUpperLeg: { value: 0, min: -0.4, max: 0.4 },
    leftLowerLeg: { value: 0, min: -0.4, max: 0.4 },
    rightLowerLeg: { value: 0, min: -0.4, max: 0.4 },
    leftFoot: { value: 0, min: -0.4, max: 0.4 },
    rightFoot: { value: 0, min: -0.4, max: 0.4 },
    Neutral: { value: 0, min: 0, max: 1 },
    Angry: { value: 0, min: 0, max: 1 },
    Relaxed: { value: 0, min: 0, max: 1 },
    Happy: { value: 0, min: 0, max: 1 },
    Sad: { value: 0, min: 0, max: 1 },
    Surprised: { value: 0, min: 0, max: 1 },
    Extra: { value: 0, min: 0, max: 1 }
  })

  const exportModel = useControls('Actions', {
    PlayAction: button((get) => {
      setPlayAction(true)
    }),
    StopAction: button((get) => {
      setPlayAction(false)
    }),
    DLjson: button((get) => {
      DLjson()
    }),
    DLgltf: button((get) => {
      DLgltf()
    }),
    CothChenge: button((get) => {
      console.log("CothChenge")
      setCoth_Chenge(!coth_chenge)
    }),
  })

  const [coth_chenge, setCoth_Chenge] = useState(false);
  const [coth_done, setCoth_Done] = useState(false);


  const { receiveShadowControl, castShadowControl } = useControls('Actions', { receiveShadowControl: true, castShadowControl: true })
  const { showBoneMarker } = useControls('Actions', { showBoneMarker: false, })


  const { url, animationUrl } = props;
  // const coth_url = '/0911測試換裝_完成_pp.vrm'
  const coth_url = '/0913測試換裝01.vrm'
  const coth_url_A = '/SEE2_TEST_半壞褲子.vrm'
  const coth_url_B = '/SEE2_TEST_VRM外套.vrm'
  const coth_url_Hat = '/SEE2_TEST_帽子.vrm'



  const [vrm, setVrm] = useState<VRM>(null);
  const [coth_vrm, setCoth_Vrm] = useState<VRM>(null);


  const [avatarClipAction, setAvatarClipAction] = useState(null);

  const meshRef = useRef();


  const { scene, camera } = useThree()
  const [gltf, setGltf] = useState<GLTF>()
  const [coth_gltf, setCoth_Gltf] = useState<GLTF>()
  const [coth_gltf_A, setCoth_Gltf_A] = useState<GLTF>()
  const [coth_gltf_B, setCoth_Gltf_B] = useState<GLTF>()
  const [coth_gltf_Hat, setCoth_Gltf_Hat] = useState<GLTF>()

  // const [progress, setProgress] = useState<number>(0)
  const avatar = useRef<VRM>()
  const [bonesStore, setBones] = useState<{ [part: string]: Object3D }>({})
  const [boneDepths, setBoneDepths] = useState<{
    [part: string]: {
      bone: THREE.Object3D;
      depth: number;
    }
  }>({})
  const [controlBoneStore, setControlBones] = useState<{ [part: string]: Object3D }>({})

  //  計算最深(末端的骨骼 如手指)
  const [maxDepth, setMaxDepth] = useState<number>(0)
  Object.values(boneDepths).forEach(boneInfo => {
    if (boneInfo.depth > maxDepth) {
      setMaxDepth(boneInfo.depth)
    }
  });

  const exporter = new GLTFExporter();


  const DLjson = () => {
    console.log("DLjson", gltf)
    if (!gltf) return
    exporter.parse(vrm.scene, (result) => {
      const json = JSON.stringify(result, null, 2);
      downloadJSON(json, 'vrm_data.json');
    }, (error: any) => {
      console.error(error);
    });
    // const json = JSON.stringify(gltf);
    // const json = JSON.stringify(gltf, null, 2);
    // console.log("json", json)
    // downloadJSON(json, 'vrm_data.json');
  }
  const DLgltf = () => {
    if (!vrm) return
    console.log("DLgltf", vrm)
    exportSceneToGLTF(vrm)
  }

  function downloadJSON(jsonString: BlobPart, fileName: string) {
    // const blob = new Blob([jsonString], { type: "application/json" });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = fileName;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);
  }
  function downloadBoneJSON(jsonString: BlobPart, fileName: string) {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  function bonesToJSON(bones: any[]) {
    return bones.map((bone: {
      animations: any;
      castShadow: any;
      children: any;
      frustumCulled: any;
      isBone: any;
      isObject3D: any;
      layers: any;
      matrixAutoUpdate: any;
      matrixWorld: any;
      matrixWorldAutoUpdate: any;
      matrixWorldNeedsUpdate: any;
      parent: any;
      quaternion: any;
      receiveShadow: any;
      renderOrder: any;
      type: any;
      up: any;
      userData: any;
      uuid: any;
      visible: any; name: any; position: { toArray: () => any; }; scale: { toArray: () => any; }; rotation: { toArray: () => any; }; matrix: { toArray: () => any; };
    }) => {
      return {
        animations: bone.animations,
        castShadow: bone.castShadow,
        children: bone.children.map((child: { name: any; }) => child.name), // Getting names of the children bones
        frustumCulled: bone.frustumCulled,
        isBone: bone.isBone,
        isObject3D: bone.isObject3D,
        layers: bone.layers.mask,
        matrix: bone.matrix.toArray(),
        matrixAutoUpdate: bone.matrixAutoUpdate,
        matrixWorld: bone.matrixWorld.toArray(),
        matrixWorldAutoUpdate: bone.matrixWorldAutoUpdate,
        matrixWorldNeedsUpdate: bone.matrixWorldNeedsUpdate,
        name: bone.name,
        parent: bone.parent ? bone.parent.name : null, // Getting name of the parent
        position: bone.position.toArray(),
        quaternion: bone.quaternion.toArray(),
        receiveShadow: bone.receiveShadow,
        renderOrder: bone.renderOrder,
        rotation: bone.rotation.toArray(),
        scale: bone.scale.toArray(),
        type: bone.type,
        up: bone.up.toArray(),
        userData: bone.userData,
        uuid: bone.uuid,
        visible: bone.visible,
      };
    });
  }
  function downloadGLTF(data: Object, fileName: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }



  function exportSceneToGLTF(vrm: VRM): void {
    console.log("downloadGLTF", vrm)

    exporter.parse(vrm.scene, (result) => {
      console.log("result", result)
      if (typeof result === 'object') {
        downloadGLTF(result, 'model.gltf');

      } else {
        console.error('Unexpected data format: ArrayBuffer received instead of JSON GLTF.');
      }
      // // if (result instanceof ArrayBuffer) {
      //   const blob = new Blob([result], { type: 'model/gltf-binary' });
      //   const url = URL.createObjectURL(blob);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = 'model.glb';
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
      //   URL.revokeObjectURL(url);
      // // } else {
      // //   console.error('Unexpected data format: JSON data received instead of binary GLTF.');
      // // }
    }, (error) => {
      console.error('An error occurred during the export:', error);
    });
  }
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

  function oldCompareBones(bonesA: THREE.Bone[], bonesB: THREE.Bone[]) {
    if (bonesA.length !== bonesB.length) {
      console.log(`Bones count mismatch: ${bonesA.length} vs ${bonesB.length}`);
      return;
    }

    bonesA.forEach((boneA, index) => {
      const boneB = bonesB[index];
      if (boneA.name == boneB.name) {
        console.log(`有Bone ${index} name mismatch: '${boneA.name}' vs '${boneB.name}'`);
      } else {
        console.log(`沒有Bone ${index} name mismatch: '${boneA.name}' vs '${boneB.name}'`);
      }
    });
  }

  function compareBones(bonesA: THREE.Bone[], bonesB: THREE.Bone[]) {
    if (bonesA.length !== bonesB.length) {
      console.log(`Bones count mismatch: ${bonesA.length} vs ${bonesB.length}`);
      return;
    }
    console.log(`找到了 bonesA${bonesA.length} bonesB${bonesB.length}`)
    // let isMatch = true;
    // bonesA.forEach((boneA, index) => {
    //   const boneB = bonesB[index];

    //   if (boneA.name !== boneB.name) {
    //     console.log(`Bone ${index} name mismatch: '${boneA.name}' vs '${boneB.name}'`);
    //     isMatch = false;
    //   }
    // });

    // if (isMatch) {
    //   console.log('Success: The bones match in number and names.');
    // } else {
    //   console.log('Failure: The bones do not match.');
    // }
  }
  // useEffect(() => {
  //   if (coth_gltf) {
  //     // VRMUtils.rotateVRM0(coth_vrm); 
  //   }
  //   if (gltf) {
  //     VRMUtils.rotateVRM0(vrm); 

  //   }
  // }, [coth_gltf, gltf])

  function replaceSkeletonButKeepAttributes(sourceBones: THREE.Bone[], targetBones: THREE.Bone[]) {
    for (let i = 0; i < sourceBones.length; i++) {
      if (targetBones[i]) {
        // Keeping the specific attributes from the target bones
        const matrix = targetBones[i].matrix.clone();
        const matrixWorld = targetBones[i].matrixWorld.clone();
        const matrixWorldNeedsUpdate = targetBones[i].matrixWorldNeedsUpdate;
        const parent = targetBones[i].parent;
        const position = targetBones[i].position.clone();
        const quaternion = targetBones[i].quaternion.clone();
        const rotation = targetBones[i].rotation.clone();
        const scale = targetBones[i].scale.clone();
        const userData = { ...targetBones[i].userData };

        // Replacing the target bone with the source bone
        targetBones[i] = sourceBones[i];

        // Reassigning the kept attributes back to the target bone
        targetBones[i].matrix.copy(matrix);
        targetBones[i].matrixWorld.copy(matrixWorld);
        targetBones[i].matrixWorldNeedsUpdate = matrixWorldNeedsUpdate;
        targetBones[i].parent = parent;
        targetBones[i].position.copy(position);
        targetBones[i].quaternion.copy(quaternion);
        targetBones[i].rotation.copy(rotation);
        targetBones[i].scale.copy(scale);
        targetBones[i].userData = userData;
      }
    }
  }

  useEffect(() => {
    if (!coth_gltf || !gltf || !coth_gltf_A || !coth_gltf_B) {
      console.log("gltf", gltf);
      console.log("coth_gltf", coth_gltf);
      console.log("coth_gltf_A", coth_gltf_A);
      console.log("coth_gltf_B", coth_gltf_B);
      console.log("coth_gltf_Hat", coth_gltf_Hat);
      return;
    }
    console.log("coth_gltf and gltf are both available");
    console.log("coth_gltf", coth_gltf);
    console.log("gltf", gltf);

    try {
      // ... (your existing code)
      // VRMUtils.rotateVRM0(vrm); 
      // VRMUtils.rotateVRM0(coth_vrm); 
      console.log("coth_gltf gltf 都有");
      // Find the 'Body' object and its bones
      const bodyObject = gltf.scene.children.find(child => child.name === 'Body') as THREE.Object3D;
      const bodySkinnedMeshes = bodyObject.children.filter(child => child instanceof THREE.SkinnedMesh) as THREE.SkinnedMesh[];
      console.log("找到了 bodySkinnedMeshes", bodySkinnedMeshes);
      // Find all objects with names starting with 'Pattern2D' and their bones
      // const pattern2DObjects = coth_gltf.scene.children.filter(child => child.name.startsWith('Pattern2D')) as THREE.Object3D[];
      const pattern2DObjects = coth_gltf.scene.children.filter(child => child.name.startsWith('Pattern2D')) as THREE.SkinnedMesh[];
      console.log("找到了 pattern2DObjects", pattern2DObjects);

      const pattern2DObjects_A = coth_gltf_A.scene.children.filter(child => child.name.startsWith('Pattern2D')) as THREE.SkinnedMesh[];
      console.log("找到了 pattern2DObjects_A", pattern2DObjects_A);

      const pattern2DObjects_B = coth_gltf_B.scene.children.filter(child => child.name.startsWith('pattern2D')) as THREE.SkinnedMesh[];
      console.log("找到了 pattern2DObjects_B", pattern2DObjects_B);

      const pattern2DObjects_Hat = coth_gltf_Hat.scene.children.filter(child => child.name.startsWith('see2_cloth_')) as THREE.SkinnedMesh[];
      console.log("找到了 pattern2DObjects_Hat", pattern2DObjects_Hat);



      // pattern2DObjects.forEach(pattern2DObject => {
      //   vrm.scene.add(pattern2DObject);
      // });
      // Additional step: Ensure material and texture correspondence
      pattern2DObjects.forEach(obj => {
        console.log(`forEach pattern2DObjects ${obj.name}`, obj.skeleton);
        // console.log("forEach bodySkinnedMeshes", bodySkinnedMeshes);
        if (0 < bodySkinnedMeshes.length) {
          // compareBones(obj.skeleton.bones, bodySkinnedMeshes[0].skeleton.bones);
          obj.skeleton.bones = bodySkinnedMeshes[0].skeleton.bones;
          vrm.scene.add(obj);
        }
      });
      pattern2DObjects_A.forEach(obj => {
        console.log(`forEach pattern2DObjects_A ${obj.name}`, obj);
        const pattern2DSkinnedMeshes_A = obj.children.filter(child => child instanceof THREE.SkinnedMesh) as THREE.SkinnedMesh[];
        console.log(`forEach pattern2DSkinnedMeshes_A`, pattern2DSkinnedMeshes_A);
        pattern2DSkinnedMeshes_A.forEach((pattern2DSkinnedMesh, index) => {
          // compareBones(pattern2DSkinnedMesh.skeleton.bones, bodySkinnedMeshes[index].skeleton.bones);
          pattern2DSkinnedMesh.skeleton.bones = bodySkinnedMeshes[0].skeleton.bones;
          vrm.scene.add(obj);
        });
      });
      pattern2DObjects_B.forEach(obj => {
        console.log(`obj pattern2DObjects_B ${obj.name}`, obj);
        const pattern2DSkinnedMeshes_B = obj.children.filter(child => child instanceof THREE.SkinnedMesh) as THREE.SkinnedMesh[];
        console.log(`forEach pattern2DSkinnedMeshes_B ${pattern2DSkinnedMeshes_B.length}`, pattern2DSkinnedMeshes_B);
        pattern2DSkinnedMeshes_B.forEach((pattern2DSkinnedMesh, index) => {
          // console.log(`sub pattern2D SkinnedMeshes  ${pattern2DSkinnedMesh.name}`, pattern2DSkinnedMesh);
          if (pattern2DSkinnedMesh.skeleton.bones.length > 0) {
            // compareBones(pattern2DSkinnedMesh.skeleton.bones, bodySkinnedMeshes[index].skeleton.bones);
            pattern2DSkinnedMesh.skeleton.bones = bodySkinnedMeshes[0].skeleton.bones;
          } else {
            console.log(`檢查他 ${pattern2DSkinnedMesh.name}`, pattern2DSkinnedMesh)
          }
          vrm.scene.add(obj);
        });
      });

      pattern2DObjects_Hat.forEach(obj => {
        console.log(`obj pattern2DObjects_Hat ${obj.name}`, obj);
        if (obj instanceof THREE.SkinnedMesh) {
          if (obj.skeleton.bones.length > 0) {
            // compareBones(obj.skeleton.bones, bodySkinnedMeshes[index].skeleton.bones);
            obj.skeleton.bones = bodySkinnedMeshes[0].skeleton.bones;
          } else {
            console.log(`檢查他 ${obj.name}`, obj)
          }
          vrm.scene.add(obj);
        }
        if (obj instanceof THREE.Group) {
          const pattern2DSkinnedMeshes_Hat = obj.children.filter(child => child instanceof THREE.SkinnedMesh) as THREE.SkinnedMesh[];
          console.log(`forEach pattern2DSkinnedMeshes_Hat ${pattern2DSkinnedMeshes_Hat.length}`, pattern2DSkinnedMeshes_Hat);
          pattern2DSkinnedMeshes_Hat.forEach((pattern2DSkinnedMesh, index) => {
            // console.log(`sub pattern2D SkinnedMeshes  ${pattern2DSkinnedMesh.name}`, pattern2DSkinnedMesh);
            if (pattern2DSkinnedMesh.skeleton.bones.length > 0) {
              // compareBones(pattern2DSkinnedMesh.skeleton.bones, bodySkinnedMeshes[index].skeleton.bones);
              pattern2DSkinnedMesh.skeleton.bones = bodySkinnedMeshes[0].skeleton.bones;
            } else {
              console.log(`檢查他 ${pattern2DSkinnedMesh.name}`, pattern2DSkinnedMesh)
            }
            vrm.scene.add(obj);
          });
        }

      });

      setCoth_Done(true);
    } catch (error) {
      console.error("An error occurred during the binding process:", error);
    }
  }, [coth_chenge]);

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
        // gltf.scene.children = gltf.scene.children.filter(child => child.name !== 'Body002');
        const vrm = gltf.userData.vrm;

        if (!vrm) {
          return;
        }

        setVrmMetadata(vrm.meta);
        console.log("vrm.meta", vrm.meta);
        setGltf(gltf)
        console.log(`gltf T`, gltf.scene);
        // compareModelFields();
        // findPattern2DObjectsAndBones();
        verifySharedSkeleton();
        async function verifySharedSkeleton(): Promise<void> {
          try {
            // 尋找名為 "Body002" 的對象
            const bodybject = gltf.scene.children.find(child => child.name === 'Body') as THREE.Object3D;

            const body002Object = gltf.scene.children.find(child => child.name === 'Body002') as THREE.Object3D;

            // 尋找所有名稱以 "Pattern2D" 開始的對象
            const pattern2DObjects = gltf.scene.children.filter(child => child.name.startsWith('Pattern2D')) as THREE.Object3D[];

            if (bodybject) {
              console.log("有喔 bodybject", bodybject);

              const bodySkinnedMeshes = bodybject.children.filter(child => child instanceof THREE.SkinnedMesh) as THREE.SkinnedMesh[];

              bodySkinnedMeshes.forEach((bodySkinnedMesh, index) => {
                console.log("有喔 body bones", bodySkinnedMesh.skeleton.bones);
                let json = JSON.stringify(bodySkinnedMesh.skeleton.bones);
                downloadJSON(json, `body_[${index}]_data.json`)
              });
            } else {
              console.log("無法找到名為 'Body' 的物件或它不包含骨骼資料");
            }

            if (body002Object) {
              const body002SkinnedMeshes = body002Object.children.filter(child => child instanceof THREE.SkinnedMesh) as THREE.SkinnedMesh[];
              pattern2DObjects.forEach((obj, T) => {
                const pattern2DSkinnedMeshes = obj.children.filter(child => child instanceof THREE.SkinnedMesh) as THREE.SkinnedMesh[];
                pattern2DSkinnedMeshes.forEach((pattern2DSkinnedMesh, index) => {
                  if (index < body002SkinnedMeshes.length) {
                    const body002SkinnedMesh = body002SkinnedMeshes[index];
                    let json = JSON.stringify(body002SkinnedMesh.skeleton.bones);
                    downloadJSON(json, `body002_[${T}]_[${index}]_data.json`)
                    // 您可以使用此函數來比較兩組 bones：
                    oldCompareBones(pattern2DSkinnedMesh.skeleton.bones, body002SkinnedMesh.skeleton.bones);

                  }
                });
              });
            } else {
              console.log("無法找到名為 'Body002' 的物件或它不包含骨骼資料");
            }

          } catch (error) {
            console.error('加載模型時出錯：', error);
          }
        }
        avatar.current = vrm
        vrm.lookAt.target = camera
        // vrm.lookAt.target = camera // 看向鏡頭


        setVrm(vrm);
        VRMUtils.deepDispose(vrm.scene);

        vrm.scene.traverse((obj: THREE.Object3D) => {
          obj.frustumCulled = false;
        });

        // 调整VRM模型中的某些骨骼节点的旋转
        vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips).rotation.y = Math.PI;

        // 提取表情名称并将它们打印到控制台
        const expressionNames = vrm.expressionManager.expressions.map((expression: { expressionName: any; }) => expression.expressionName);
        console.log(expressionNames);

        // 提取和设置一系列的骨骼节点并将它们存储到bones对象中
        const controlBones = {
          head: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head),
          neck: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Neck),
          hips: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Hips),
          spine: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Spine),
          upperChest: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.UpperChest),
          leftArm: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperArm),
          rightArm: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightUpperArm),
          leftLowerArm: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftLowerArm),
          rightLowerArm: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightLowerArm),
          leftHand: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftHand),
          rightHand: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightHand),
          leftUpperLeg: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperLeg),
          rightUpperLeg: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightUpperLeg),
          leftLowerLeg: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftLowerLeg),
          rightLowerLeg: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightLowerLeg),
          leftFoot: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftFoot),
          rightFoot: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightFoot)
        };
        setControlBones(controlBones);
        const bones: { [part: string]: Object3D } = {};

        Object.values(VRMHumanBoneName).forEach((boneName) => {
          let boneNode = vrm.humanoid.getNormalizedBoneNode(boneName);

          if (!boneNode) {
            boneNode = vrm.humanoid.getRawBoneNode(boneName);
          }

          if (boneNode) {
            bones[boneName] = boneNode;
          }
        });
        // 可以使用setBones或其他方法来存储bones对象，这里假设setBones是一个可用的函数
        setBones(bones);
        console.log("bonesStore", bones);
        console.log("vrm.humanoid", vrm.humanoid);

        // calculateBoneDepth 函數目前正確地遞歸計算了骨骼的深度。它檢查當前骨骼的父對象是否存在和是否是另一個骨骼（'Bone' 類型），並根據這個依賴關系遞增深度值。
        function calculateBoneDepth(bone: THREE.Object3D): number {
          // console.log('Bone type:', bone.type, 'Parent type:', bone.parent?.type);

          if (!bone.parent || bone.parent.type !== 'Object3D') {
            return 0;
          }

          return 1 + calculateBoneDepth(bone.parent as THREE.Object3D);
        }

        const Depths: {
          [part: string]: {
            bone: THREE.Object3D;
            depth: number;
          }
        } = {};
        Object.values(VRMHumanBoneName).forEach((boneName) => {
          const depth_boneNode = vrm.humanoid.getNormalizedBoneNode(boneName);
          if (depth_boneNode) {
            const depth = calculateBoneDepth(depth_boneNode);
            Depths[boneName] = { bone: depth_boneNode, depth };
          }
        });

        setBoneDepths(Depths);
        console.log("boneDepthsStore", Depths);


        // VRMUtils.rotateVRM0(vrm); 
        // VRMUtils.rotateVRM0(vrm); // vrm.lookAt.target = camera
        console.log(vrm);
        setPlayAction(true)

      },
      (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),
      (error) => {
        console.log('An error happened')
        console.log(error)
      },
    );
  }, [url]);

  useEffect(() => {
    if (!coth_url) {
      return;
    }

    const loader = new GLTFLoader();
    loader.crossOrigin = 'anonymous';

    loader.register((parser) => {
      return new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true });
    });

    loader.load(
      coth_url,
      (gltf) => {
        // gltf.scene.children = gltf.scene.children.filter(child => child.name !== 'Body002');
        const coth_vrm = gltf.userData.vrm;

        if (!coth_vrm) {
          return;
        }
        setVrmMetadata(coth_vrm.meta);
        console.log("coth_vrm.meta", coth_vrm.meta);
        setCoth_Gltf(gltf)
        console.log(`gltf T Coth`, gltf.scene);
        avatar.current = coth_vrm
        coth_vrm.lookAt.target = camera
        // coth_vrm.lookAt.target = camera // 看向鏡頭
        // setCoth_Vrm(coth_vrm);
        VRMUtils.deepDispose(coth_vrm.scene);
        coth_vrm.scene.traverse((obj: THREE.Object3D) => {
          obj.frustumCulled = false;
        });
        // VRMUtils.rotateVRM0(coth_vrm); 
        // VRMUtils.rotateVRM0(coth_vrm); // coth_vrm.lookAt.target = camera
        console.log(coth_vrm);
      },
      (progress) => console.log('Loading coth_vrm model...', 100.0 * (progress.loaded / progress.total), '%'),
      (error) => {
        console.log('An error happened')
        console.log(error)
      },
    );
  }, [coth_url]);

  useEffect(() => {
    if (!coth_url_A) {
      return;
    }

    const loader = new GLTFLoader();
    loader.crossOrigin = 'anonymous';

    loader.register((parser) => {
      return new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true });
    });

    loader.load(
      coth_url_A,
      (gltf) => {
        // gltf.scene.children = gltf.scene.children.filter(child => child.name !== 'Body002');
        const coth_vrm = gltf.userData.vrm;

        if (!coth_vrm) {
          return;
        }
        setVrmMetadata(coth_vrm.meta);
        console.log("coth_vrm.meta", coth_vrm.meta);
        setCoth_Gltf_A(gltf)
        console.log(`gltf T coth_url_A`, gltf.scene);
        avatar.current = coth_vrm
        coth_vrm.lookAt.target = camera
        // coth_vrm.lookAt.target = camera // 看向鏡頭
        // setCoth_Vrm(coth_vrm);
        VRMUtils.deepDispose(coth_vrm.scene);
        coth_vrm.scene.traverse((obj: THREE.Object3D) => {
          obj.frustumCulled = false;
        });
        // VRMUtils.rotateVRM0(coth_vrm); 
        console.log(coth_vrm);
      },
      (progress) => console.log('Loading coth_vrm model...', 100.0 * (progress.loaded / progress.total), '%'),
      (error) => {
        console.log('An error happened')
        console.log(error)
      },
    );
  }, [coth_url_A]);


  useEffect(() => {
    if (!coth_url_B) {
      return;
    }

    const loader = new GLTFLoader();
    loader.crossOrigin = 'anonymous';

    loader.register((parser) => {
      return new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true });
    });

    loader.load(
      coth_url_B,
      (gltf) => {
        // gltf.scene.children = gltf.scene.children.filter(child => child.name !== 'Body002');
        const coth_vrm = gltf.userData.vrm;

        if (!coth_vrm) {
          return;
        }
        setVrmMetadata(coth_vrm.meta);
        console.log("coth_vrm.meta", coth_vrm.meta);
        setCoth_Gltf_B(gltf)
        console.log(`gltf T coth_url_B`, gltf.scene);
        avatar.current = coth_vrm
        coth_vrm.lookAt.target = camera
        // coth_vrm.lookAt.target = camera // 看向鏡頭
        // setCoth_Vrm(coth_vrm);
        VRMUtils.deepDispose(coth_vrm.scene);
        coth_vrm.scene.traverse((obj: THREE.Object3D) => {
          obj.frustumCulled = false;
        });
        // VRMUtils.rotateVRM0(coth_vrm); 
        console.log(coth_vrm);
      },
      (progress) => console.log('Loading coth_vrm model...', 100.0 * (progress.loaded / progress.total), '%'),
      (error) => {
        console.log('An error happened')
        console.log(error)
      },
    );
  }, [coth_url_B]);


  useEffect(() => {
    if (!coth_url_Hat) {
      return;
    }

    const loader = new GLTFLoader();
    loader.crossOrigin = 'anonymous';

    loader.register((parser) => {
      return new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true });
    });

    loader.load(
      coth_url_Hat,
      (gltf) => {
        // gltf.scene.children = gltf.scene.children.filter(child => child.name !== 'Body002');
        const coth_vrm = gltf.userData.vrm;

        if (!coth_vrm) {
          return;
        }
        setVrmMetadata(coth_vrm.meta);
        console.log("coth_vrm.meta", coth_vrm.meta);
        setCoth_Gltf_Hat(gltf)
        console.log(`gltf T coth_url_Hat`, gltf.scene);
        avatar.current = coth_vrm
        coth_vrm.lookAt.target = camera
        // coth_vrm.lookAt.target = camera // 看向鏡頭
        // setCoth_Vrm(coth_vrm);
        VRMUtils.deepDispose(coth_vrm.scene);
        coth_vrm.scene.traverse((obj: THREE.Object3D) => {
          obj.frustumCulled = false;
        });
        // VRMUtils.rotateVRM0(coth_vrm); 
        console.log(coth_vrm);
      },
      (progress) => console.log('Loading coth_vrm model...', 100.0 * (progress.loaded / progress.total), '%'),
      (error) => {
        console.log('An error happened')
        console.log(error)
      },
    );
  }, [coth_url_Hat]);



  useEffect(() => {
    if (isPlayAction) {
      VRMUtils.rotateVRM0(vrm); // vrm.lookAt.target = camera
    }
  }, [isPlayAction])

  useImperativeHandle(ref, () => ({ vrm, animationMixer }), [vrm, animationMixer]);

  useFrame(({ clock }, deltaTime) => {

    if (isPlayAction) {
      animationMixer?.update(deltaTime);
      vrm?.update(deltaTime);
    }

    const t = clock.getElapsedTime()

    if (avatar.current) {
      avatar.current.update(deltaTime)
      const blinkDelay = 10
      const blinkFrequency = 3
      if (Math.round(t * blinkFrequency) % blinkDelay === 0) {
        avatar.current.expressionManager.setValue('blink', 1 - Math.abs(Math.sin(t * blinkFrequency * Math.PI)))
      }
      avatar.current.expressionManager.setValue('neutral', controls.Neutral)
      avatar.current.expressionManager.setValue('angry', controls.Angry)
      avatar.current.expressionManager.setValue('relaxed', controls.Relaxed)
      avatar.current.expressionManager.setValue('happy', controls.Happy)
      avatar.current.expressionManager.setValue('sad', controls.Sad)
      avatar.current.expressionManager.setValue('Surprised', controls.Surprised)
      avatar.current.expressionManager.setValue('Extra', controls.Extra)
    }
    // if (bonesStore.neck) {
    //   bonesStore.neck.rotation.y = (Math.PI / 100) * Math.sin((t / 4) * Math.PI)
    // }
    // if (controlBoneStore.spine) {
    //   controlBoneStore.spine.position.x = controls.Spine *(Math.PI / 300) * Math.sin((t / 4) * Math.PI)
    //   controlBoneStore.spine.position.z = (Math.PI / 300) * Math.cos((t / 4) * Math.PI)
    // }

    // if (controlBoneStore.upperChest) {
    //   controlBoneStore.upperChest.rotation.y = (Math.PI / 600) * Math.sin((t / 8) * Math.PI)
    //   controlBoneStore.spine.position.y = (Math.PI / 400) * Math.sin((t / 2) * Math.PI)
    //   controlBoneStore.spine.position.z = (Math.PI / 600) * Math.sin((t / 2) * Math.PI)
    // }
    // if (controlBoneStore.head) {
    //   controlBoneStore.head.rotation.y = controls.Head * Math.PI
    // }

    // if (controlBoneStore.leftArm) {
    //   // controlBoneStore.leftArm.position.y = leftArm
    //   controlBoneStore.leftArm.rotation.z = controls.leftArm * Math.PI
    // }
    // if (controlBoneStore.rightArm) {
    //   controlBoneStore.rightArm.rotation.z = controls.rightArm * Math.PI
    // }
    // if (controlBoneStore.leftLowerArm) {
    //   controlBoneStore.leftLowerArm.rotation.z = controls.leftLowerArm * Math.PI;
    // }
    // if (controlBoneStore.rightLowerArm) {
    //   controlBoneStore.rightLowerArm.rotation.z = controls.rightLowerArm * Math.PI;
    // }
    // if (controlBoneStore.leftHand) {
    //   controlBoneStore.leftHand.rotation.z = controls.leftHand * Math.PI;
    // }
    // if (controlBoneStore.rightHand) {
    //   controlBoneStore.rightHand.rotation.z = controls.rightHand * Math.PI;
    // }
    // if (controlBoneStore.leftUpperLeg) {
    //   controlBoneStore.leftUpperLeg.rotation.x = controls.leftUpperLeg * Math.PI;
    // }

    // if (controlBoneStore.rightUpperLeg) {
    //   controlBoneStore.rightUpperLeg.rotation.x = controls.rightUpperLeg * Math.PI;
    // }

    // if (controlBoneStore.leftLowerLeg) {
    //   controlBoneStore.leftLowerLeg.rotation.x = controls.leftLowerLeg * Math.PI;
    // }

    // if (controlBoneStore.rightLowerLeg) {
    //   controlBoneStore.rightLowerLeg.rotation.x = controls.rightLowerLeg * Math.PI;
    // }

    // if (controlBoneStore.leftFoot) {
    //   controlBoneStore.leftFoot.rotation.x = controls.leftFoot * Math.PI;
    // }

    // if (controlBoneStore.rightFoot) {
    //   controlBoneStore.rightFoot.rotation.x = controls.rightFoot * Math.PI;
    // }
    //    這段代碼將會根據相對應的控制來旋轉各個節點


  })

  if (vrm) {
    vrm.scene.children.forEach((mesh: { castShadow: boolean; receiveShadow: boolean; }, i) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    })
    // vrm.scene.castShadow = true;
    // vrm.scene.receiveShadow = true;
    vrm.scene.name = 'ESNXAvatar';
    // vrm.scene.name = 'Normalized_hips';
    return <>
      {<primitive ref={meshRef} castShadow={castShadowControl} receiveShadow={receiveShadowControl} position={props.position} object={vrm.scene} />}

      {/* {coth_vrm && <primitive ref={meshRef} castShadow={castShadowControl} receiveShadow={receiveShadowControl} position={[0, 0, 0]} object={coth_vrm.scene} />} */}

      {/* <LocationParts avatar={avatar} bonesStore={bonesStore} gltf={Glasses_modelUrl} /> 使用新的 LocationParts 组件 */}
      {/* <LocationParts avatar={avatar} bonesStore={bonesStore} /> */}
      {/* {Object.values(bonesStore).map((bone, index) => (
        <BoneMarker key={index} bone={bone} />
      ))} */}
      {
        showBoneMarker && Object.values(boneDepths).map((boneInfo, index) => {
          // console.log('boneInfo', boneInfo);
          return <BoneMarker key={index} bone={boneInfo.bone} depth={boneInfo.depth} maxDepth={maxDepth} />
        })
      }
      {/* other components */}
      <LocationPartsList avatar={avatar} bonesStore={bonesStore} />
    </>
  }

  // return vrm && <primitive object={vrm.scene} />
});


AnimatableAvatar.displayName = 'AnimatableAvatar';

