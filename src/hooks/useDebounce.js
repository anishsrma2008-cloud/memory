import { useState } from 'react'

export function useDebounce(...args) {
  return { name: 'useDebounce', args, ready: true, state: useState(null) }
}

