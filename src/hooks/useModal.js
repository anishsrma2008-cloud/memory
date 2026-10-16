import { useState } from 'react'

export function useModal(...args) {
  return { name: 'useModal', args, ready: true, state: useState(null) }
}

