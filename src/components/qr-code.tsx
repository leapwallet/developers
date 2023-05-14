import React, { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import LeapLogo from '~/assets/leap-logo.svg'
import { toast } from 'react-hot-toast'

type Props = {
  data: string
  height: number
  width: number
  downloadConfig?: {
    fileName: string
    elementID: string
  }
}

const qrCode = new QRCodeStyling({
  image: LeapLogo.src,
  margin: 8,
  type: 'svg',
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q'
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.5,
    margin: 10
  },
  dotsOptions: {
    color: '#000',
    type: 'dots'
  },
  backgroundOptions: {
    color: '#FFF'
  },
  cornersSquareOptions: {
    color: '#000',
    type: 'dot'
  },
  cornersDotOptions: {
    color: '#000',
    type: 'dot'
  }
})

export const QrCode = ({ width, height, data, downloadConfig }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    qrCode.update({
      data,
      height: height,
      width: width
    })
  }, [data, height, width])

  useEffect(() => {
    if (downloadConfig) {
      const downloadElement = document.getElementById(downloadConfig.elementID)
      const handleDownload = () => {
        const biggerQR = new QRCodeStyling(qrCode._options)
        biggerQR.update({
          height: 512,
          width: 512
        })
        biggerQR.getRawData('png').then((blob) => {
          if (!blob) {
            toast.error('Something went wrong, please reload the page.')
            return
          }
          const link = document.createElement('a')
          const blobUrl = URL.createObjectURL(blob)
          link.setAttribute('href', blobUrl)
          link.setAttribute('target', '_blank')
          link.setAttribute('download', `${downloadConfig.fileName}.png`)
          link.click()
          URL.revokeObjectURL(blobUrl)
        })
      }

      if (downloadElement) {
        downloadElement.addEventListener('click', handleDownload)
      }

      return () => {
        if (downloadElement) {
          downloadElement.removeEventListener('click', handleDownload)
        }
      }
    }
  }, [downloadConfig])

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current)
    }
  }, [])

  return (
    <div className="inline-block rounded-3xl overflow-hidden border border-gray-300 shadow-lg">
      <div
        className="qr-code"
        ref={ref}
        style={{
          height,
          width
        }}
      />
    </div>
  )
}

export default QrCode
