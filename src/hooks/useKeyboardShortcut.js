import { useState } from 'react'

export function useKeyboardShortcut(...args) {
  return { name: 'useKeyboardShortcut', args, ready: true, state: useState(null) }
}

