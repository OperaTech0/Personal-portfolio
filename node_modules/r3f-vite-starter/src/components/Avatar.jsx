
import React, { useEffect, useRef } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import {useControls} from "leva";
import * as THREE from 'three';

export function Avatar(props){
    const {animation,wireframe} = props;
    const {headFollow,cursorFollow} = useControls({
        headFollow: false,
        cursorFollow:false,
        wireframe:false
    })
    const group =  useRef();
  const { nodes, materials } = useGLTF('/models/661af95914ff3d92bd45d9f6.glb');
  const {animations: typingAnimation} = useFBX('animations/Typing.fbx');
  const {animations: standingAnimation} = useFBX('animations/Standing Idle.fbx');
  const {animations: fallingAnimation} = useFBX('animations/Falling Idle.fbx');



  typingAnimation[0].name =  "Typing";
  standingAnimation[0].name =  "Standing";
  fallingAnimation[0].name =  "Falling";

  const {actions} =  useAnimations([typingAnimation[0],standingAnimation[0],fallingAnimation[0]],group);

  useFrame((state)=>{
    if(headFollow){
        group.current.getObjectByName("Head").lookAt(state.camera.position);
    }
    
    if(cursorFollow){   
        const target = new THREE.Vector3(state.mouse.x,state.mouse.y,1);
        group.current.getObjectByName("Spine2").lookAt(target);
    }
    
    
  });

  useEffect(()=>{
    Object.values(materials).forEach((material)=>{
        material.wireframe = wireframe;
    })
  },[wireframe]);

  // Approximate a younger boy with an afro by enlarging/darkening the hair
  // and slightly adjusting head scale and outfit colors.
  useEffect(()=>{
    const g = group.current;
    if(!g) return;

    // enlarge hair to approximate an afro
    const hair = g.getObjectByName('Wolf3D_Hair');
    if(hair){
      hair.scale.set(1.6, 1.6, 1.6);
      hair.position.y = 0.02;
    }

    // slightly increase head size for more childlike proportions
    const head = g.getObjectByName('Wolf3D_Head');
    if(head){
      head.scale.set(1.05, 1.05, 1.05);
    }

    // darken hair material and make skin a bit softer (childlike)
    if(materials.Wolf3D_Hair){
      materials.Wolf3D_Hair.color = new THREE.Color('#e9e3e3');
      materials.Wolf3D_Hair.roughness = 0.8;
    }
    if(materials.Wolf3D_Skin){
      // subtle brighten for a youthful tone
      materials.Wolf3D_Skin.color.offsetHSL(0,0,0.02);
    }

    // Apply suit materials: navy jacket/pants and black shoes
    if(materials.Wolf3D_Outfit_Top){
      materials.Wolf3D_Outfit_Top.color = new THREE.Color('#0b3d91');
      materials.Wolf3D_Outfit_Top.roughness = 0.5;
      materials.Wolf3D_Outfit_Top.metalness = 0.03;
    }
    if(materials.Wolf3D_Outfit_Bottom){
      materials.Wolf3D_Outfit_Bottom.color = new THREE.Color('#0b3d91');
      materials.Wolf3D_Outfit_Bottom.roughness = 0.55;
      materials.Wolf3D_Outfit_Bottom.metalness = 0.02;
    }
    if(materials.Wolf3D_Outfit_Footwear){
      materials.Wolf3D_Outfit_Footwear.color = new THREE.Color('#0b0b0b');
      materials.Wolf3D_Outfit_Footwear.roughness = 0.25;
      materials.Wolf3D_Outfit_Footwear.metalness = 0.2;
    }

  },[]);

  useEffect(()=>{
    actions[animation].reset().fadeIn(0.5).play();
    return ()=>{
        actions[animation].reset().fadeOut(0.5).stop();
    }
  },[animation])

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
       frustumCulled={false}
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
      frustumCulled={false}
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
      frustumCulled={false}
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
      frustumCulled={false}
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
      frustumCulled={false}
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
      frustumCulled={false}
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
      frustumCulled={false}
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
      frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
      frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
      frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  )
}

useGLTF.preload('/models/661af95914ff3d92bd45d9f6.glb');
useFBX.preload("/animations/Typing.fbx");
useFBX.preload("/animations/Falling Idle.fbx");
useFBX.preload("/animations/Standing Idle.fbx");
