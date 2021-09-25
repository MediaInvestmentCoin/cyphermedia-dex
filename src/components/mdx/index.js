import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import TaxSimulator from './taxSimulator'
import Video from './video'

const components = {
  TaxSimulator,
  Video
}

export default function MDX({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
