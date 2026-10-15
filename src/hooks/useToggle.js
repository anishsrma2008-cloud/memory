import { useState } from 'react'

export function useToggle(...args) {
  return { name: 'useToggle', args, ready: true, state: useState(null) }
}

