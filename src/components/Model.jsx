import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ModelView from "./ModelView"
import { useEffect, useRef, useState } from "react"
import { yellowImg } from "../utils"

import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { models, sizes } from "../constants"
import { animateWithGsapTimeline } from "../utils/animations"
import InteractiveControls from "./InteractiveControls"

const Model = () => {
  
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium.',
    color: ['#9F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  })

  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();
  
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if(size === 'large') {
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }

    if(size === 'small') {
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2
      })
    }
  }, [size])

  useGSAP(() => {
    gsap.to('#heading', {
      y:0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: '#heading',
        start: 'top 95%'
      }
    })
  })

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative z-10">
            <ModelView 
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden"
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>
          <InteractiveControls 
            id='model'
            props={{
              models: models,
              model: model,
              setModel: setModel,
              sizes: sizes,
              size: size,
              setSize: setSize
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Model