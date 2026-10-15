import { useState } from 'react'

export function useSearch(...args) {
  return { name: 'useSearch', args, ready: true, state: useState(null) }
}

