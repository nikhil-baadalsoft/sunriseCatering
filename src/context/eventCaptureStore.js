import { createContext } from 'react'

export const EventCaptureContext = createContext({
  captureEvent: () => {},
  resetEventSequence: () => {},
})
