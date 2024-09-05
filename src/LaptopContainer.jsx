/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useGLTF, useScroll, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from '@react-three/fiber';

const LaptopContainer = ({ current, images, clicked }) => {
  const [offsetValue, setOffsetValue] = useState(0); // Initial offset value
  const rotationRef = useRef(180); // Ref to keep track of rotation

  let model = useGLTF("./mac.glb");
  let tex = useTexture(images);
  let meshes = {};

  model.scene.traverse(frame => {
    meshes[frame.name] = frame;
  });

  useEffect(() => {
    meshes.matte.material.map = tex[current];
    meshes.matte.material.needsUpdate = true;
  }, [current, tex, meshes]);

  meshes.screen.rotation.x = THREE.MathUtils.degToRad(rotationRef.current);
  meshes.matte.material.emissiveIntensity = 0;
  meshes.matte.material.metalness = 1;
  meshes.matte.material.roughness = 1;

  useEffect(() => {
    if(!clicked){
      meshes.matte.material.color.r = 0;
      meshes.matte.material.color.g = 0;
      meshes.matte.material.color.b = 0;
    } else{
      meshes.matte.material.color.r = 1;
      meshes.matte.material.color.g = 1;
      meshes.matte.material.color.b = 1;
    }
  }, [clicked])
  
  useFrame((state, delta) => {
    if(clicked){
      if (rotationRef.current > 90) {
        if((rotationRef.current - (delta * 30)) >= 90)
          rotationRef.current -= delta * 30;

        const normalizedRotation = (180 - rotationRef.current) / 180;
        if(offsetValue>0){
          setOffsetValue(normalizedRotation*2);
        } else{
          setOffsetValue(normalizedRotation)
        }
      }
    } else{
      if (rotationRef.current < 180) {
        if((rotationRef.current + (delta * 30)) <= 180)
          rotationRef.current += delta * 30;
        const normalizedRotation = (180 - rotationRef.current ) / 180;
        if(offsetValue<=1){
          setOffsetValue(normalizedRotation*2);
        } else{
          setOffsetValue(0)
        }
      }
    }
    
    meshes.screen.rotation.x = THREE.MathUtils.degToRad(rotationRef.current);
  });

  return (
    <group position={[0, 1 - (9 * offsetValue), 20]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default LaptopContainer;