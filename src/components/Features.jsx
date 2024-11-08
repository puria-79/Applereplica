import { useGSAP } from "@gsap/react"
import { animationWithGsap } from "../utils/animations"
import { explore1Img, explore2Img, exploreVideo } from "../utils"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom'
      },
      onComplete: () => {
        videoRef.current.play();
      }
    })
    animationWithGsap('#features_title', {y:0, opacity:1})
    animationWithGsap('.g_grow', {scale: 1, opacity: 1, ease: 'power1'}, {scrub: 5.5})
    animationWithGsap('.g_text', { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1})
  }, [])

  useGSAP(() => {
    gsap.from('#features_head', {
      y:60,
      opacity: 0,
      scrollTrigger: {
        trigger: '#features_head',
        toggleActions: 'restart reverse restart reverse',
        start: 'top 85%'
      }
    })
  }, [])

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">Explore the full story.</h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 id="features_head" className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 id="features_head" className="text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
          </div>

          <div className="flex-center gap-5 flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video playsInline id="exploreVideo" className="w-full h-full object-cover object-center" preload="none" muted autoPlay ref={videoRef}>
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-col w-full relative">
               <div className="feature-video-container">
                  <div className="overflow-hidden flex-1 h-[50vh]">
                    <img src={explore1Img} alt="titanium" className="feature-video g_grow" />
                  </div>
                  <div className="overflow-hidden flex-1 h-[50vh]">
                    <img src={explore2Img} alt="titanium 2" className="feature-video g_grow" />
                  </div>
               </div>
               <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is {' '}
                    <span className="text-white ">
                      the first iPhone to feature an aurospace-grade titanium design
                    </span>, 
                    using the same alloy that spacecrafts use for missions to Mars.
                  </p>
                </div>
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-toweight ratios of any metal, making these our {' '}
                    <span className="text-white ">
                      lightest Pro models ever
                    </span>. 
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features