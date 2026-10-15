import { useState } from 'react'

export function useToast(...args) {
  return { name: 'useToast', args, ready: true, state: useState(null) }
}

