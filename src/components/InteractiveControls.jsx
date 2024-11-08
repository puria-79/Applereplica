import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger)

const InteractiveControls = ({id, props}) => {
  const tl = useRef();
  useGSAP(() => {
    gsap.to('.z-1', {
      position: 'fixed',
      y: -30,
      scale: 1,
      ease: 'back',
      scrollTrigger: {
        fastScrollEnd: 750,
        trigger: '#videocarousel',
        toggleActions: 'restart reverse restart reverse',
        start: '55% bottom',
        end: 'bottom 70%'
      }
    })
  }, [])
  useGSAP(() => {
    gsap.to('.z-2', {
      position: 'fixed',
      y: -20,
      scale: 1,
      ease: 'back',
      scrollTrigger: {
        fastScrollEnd: 800,
        trigger: '#model',
        toggleActions: 'restart reverse restart reverse',
        start: '10% bottom',
        end: '30% top'
      }
    })
  }, [])
  return (
    <>
      {id === 'videoCarousel' ? 
        <div id="videocarousel" className="h-[100vh] w-full flex justify-center items-end absolute left-0 top-0">
          <div className="z-1 scale-0 bottom-[0px] items-center flex">
              <div className="relative flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {props.videoRef.current.map((_, i) => (
                  <span
                    key={i}
                    className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer element"
                    ref={(el) => (props.videoDivRef.current[i] = el)}
                  >
                    <span
                      key={i}
                      className="absolute h-full w-full rounded-full element"
                      ref={(el) => (props.videoSpanRef.current[i] = el)}
                    />
                  </span>
                ))}
              </div>

              <button className="control-btn">
                <img
                  src={props.isLastVideo ? props.replayImg : !props.isPlaying ? props.playImg : props.pauseImg}
                  alt={props.isLastVideo ? "replay" : !props.isPlaying ? "play" : "pause"}
                  onClick={
                    props.isLastVideo
                      ? () => props.handleProcess("video-reset")
                      : !props.isPlaying
                      ? () => props.handleProcess("play")
                      : () => props.handleProcess("pause")
                  }
                />
              </button>
            </div>
        </div> : 
        id === 'model' ? 
        <div id="model" className="absolute bottom-0 flex justify-center items-end left-0 w-full h-[100vh]">
            <div className="scale-0 flex justify-center z-2 bottom-[0px] mt-[100px] z-30">
              <p className="text-sm font-light text-center mb-5">
                <span className="flex-1 justify-center p-1 px-2 backdrop-blur bg-gray-300 rounded-full">{props.model.title}</span>
                <div className="flex-center mt-5">
                  <ul className="color-container">
                    {props.models.map((item, i) => (
                      <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer active:border-2" style={{backgroundColor: item.color[0] }} onClick={() => props.setModel(item)} />
                    ))}
                  </ul>

                  <button className="size-btn-container">
                    {props.sizes.map(({ label, value }) => (
                      <span key={label} className="size-btn" style={{backgroundColor: props.size === value ? 'white' : 'transparent', color: props.size === value ? 'black' : 'white'}} onClick={() => props.setSize(value)}>
                        {label}
                      </span>
                    ))}
                  </button>
                </div>
              </p>
            </div>
        </div> :
        <div></div>
      }
    </>
  )
}

export default InteractiveControls;