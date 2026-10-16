import { useState } from 'react'

export function useFilters(...args) {
  return { name: 'useFilters', args, ready: true, state: useState(null) }
}

