import React from 'react'
import { chipImg } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

const HowItWorks = () => {
  useGSAP(() => {
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom'
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut'
    })
    gsap.from('#chip-text', {
      scrollTrigger: {
        trigger: '#chip-text',
        start: '10% bottom'
      },
      opacity: 0,
      y: 50,
      duration: 2,
      ease: 'power2.inOut'
    })
  }, [])
  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <div id='chip' className='flex-center w-full my-20'>
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>
        <div id='chip-text' className='flex-center w-full overflow-hidden my-20'>
          A17 bionic chip offers a seemless experience for modern games.
        </div>
      </div>
    </section>
  )
}

export default HowItWorks