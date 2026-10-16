import { useState } from 'react'

export function useMediaQuery(...args) {
  return { name: 'useMediaQuery', args, ready: true, state: useState(null) }
}

