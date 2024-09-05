/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import LaptopContainer from './LaptopContainer';
import { Environment, OrbitControls, ScrollControls } from '@react-three/drei';
import PowerButton from './PowerButton';

const App = () => {
  const [current, setCurrent] = useState(0);
  const [clicked, setClicked] = useState(false);
  const images = ["./resume.png", "./1.png", "2.png"];

  const handleNext = () => {
    setCurrent((current) => (current+1)%(images.length));
  };

  const handlPrevious = () => {
    setCurrent((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          handlPrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <div>
      <div className='w-full h-screen text-white flex-col px-2'>
        <div className='w-full h-[10vh] flex items-center justify-end' onClick={() => {setClicked(!clicked)}}>
          <PowerButton clicked={clicked} />
        </div>
        <div className='w-full flex h-[90vh]'>
          <div className='w-[7%] flex items-center justify-center ml-[3%]' onClick={handlPrevious}>
            <h1>Previous</h1>
          </div>
          <div className='w-[80%]'>
            <Canvas camera={{ fov: 8, position: [0, 15, 220] }}>
              {/* <OrbitControls /> */}
              <Environment files={["https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr"]} />
              {/* <ScrollControls pages={3}> */}
                <LaptopContainer current={current} images={images} clicked={clicked}/>
              {/* </ScrollControls> */}
            </Canvas>
          </div>
          <div className='w-[7%] flex items-center justify-center' onClick={handleNext}>
            <h1>Next</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;