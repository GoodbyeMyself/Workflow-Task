'use client'

import React, { lazy, Suspense } from 'react'

type DynamicPdfPreviewProps = {
  url: string
  onCancel: () => void
}

const PdfPreview = lazy(() => import('./pdf-preview'))

const DynamicPdfPreview: React.FC<DynamicPdfPreviewProps> = (props) => (
  <Suspense fallback={null}>
    <PdfPreview {...props} />
  </Suspense>
)

export default DynamicPdfPreview
