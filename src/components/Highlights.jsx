import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import {rightImg, watchImg} from "../utils"
import VideoCarousel from "./VideoCarousel"
gsap.registerPlugin(ScrollTrigger)

const Highlights = () => {
  useGSAP(() => {
    gsap.to('#title', {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: '#title',
        start: 'top 95%'
      }
    })
    gsap.to('.link', {
      opacity:1,
      y:0,
      duration:1,
      stagger: 0.25,
      scrollTrigger: {
        trigger: '.link',
        start: 'top 95%'
      }
    })
  }, [])
  return (
    <section id="highlights" className="w-screen h-full common-padding bg-zinc">
      <div className="screen-max-width h-[100vh] absolute">
        <div className="md:flex mb-12 w-full items-end justify-between">
          <h1 id="title" className="section-heading">Get the highlights.</h1>
          <div className="flex flex-wrap items-end gap-5 z-20">
            <p className="link">Watch the film
              <img src={watchImg} alt='watch' className="ml-2"/>
            </p>
            <p className="link">Watch the event
              <img src={rightImg} alt='right' className="ml-2"/>
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights