import { useState } from 'react'

export function useLocalStorage(...args) {
  return { name: 'useLocalStorage', args, ready: true, state: useState(null) }
}

