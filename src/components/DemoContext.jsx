import { createContext, useContext } from 'react'

// openDemo(interest?) opens the Request Demo modal, optionally preselecting an interest.
export const DemoContext = createContext(() => {})

export function useDemo() {
  return useContext(DemoContext)
}
