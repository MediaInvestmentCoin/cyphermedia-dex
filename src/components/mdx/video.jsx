import React, { useEffect, useRef } from 'react'
import SwapDemo from '../../images/swap-demo.mp4'
import AddLiquidityDemo from '../../images/add-liquidity-demo.mp4'
import RemoveLiquidityDemo from '../../images/remove-liquidity-demo.mp4'
import StakeDemo from '../../images/stake-demo.mp4'
import UnstakeDemo from '../../images/unstake-demo.mp4'

import TrackVisibility from 'react-on-screen'

export const VIDEO_OPTIONS = {
  SwapDemo: SwapDemo,
  AddLiquidityDemo: AddLiquidityDemo,
  RemoveLiquidityDemo: RemoveLiquidityDemo,
  StakeDemo: StakeDemo,
  UnstakeDemo: UnstakeDemo
}
/**
 * Trigger the specified event on the specified element.
 * @param  {Object} elem  the target element.
 * @param  {String} event the type of the event (e.g. 'click').
 */
function triggerEvent(elem, event) {
  var clickEvent = new Event(event) // Create the event.
  elem.dispatchEvent(clickEvent) // Dispatch the event.
}

function VideoInner({ isVisible, vid }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isVisible && ref.current) {
      ref.current.play()
    }
    if (!isVisible && ref.current) {
      ref.current.pause()
    }
  }, [ref.current, isVisible])

  return (
    <video id="video" style={{ maxWidth: '100%' }} src={vid} controls ref={ref} muted={true} autoPlay={true}></video>
  )
}

export default function Video({ option, description }) {
  return (
    <TrackVisibility partialVisibility offset={10}>
      {({ isVisible }) => (
        <>
          <VideoInner isVisible={isVisible} vid={VIDEO_OPTIONS[option] ?? 'SwapDemo'} />
          <p style={{ marginBottom: '2rem', fontStyle: 'italic', fontSize: '14px', opacity: 0.6 }}>
            {description ? description : ''}
          </p>
        </>
      )}
    </TrackVisibility>
  )
}
