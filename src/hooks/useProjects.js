import { useState } from 'react'

export function useProjects(...args) {
  return { name: 'useProjects', args, ready: true, state: useState(null) }
}

