/* eslint-disable @next/next/no-img-element */
import ButtonApp from 'components/ButtonApp'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from './canvaspreview'
import { useDebounceEffect } from './useDebounceEffect'
import style from './imagecrop.module.scss'

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: 200,
        height: 200
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

const ImageCrop = ({ src, onComplited }: { src: string, onComplited: Function }) => {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  const imageRef = useRef<HTMLImageElement>(null)

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imageRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imageRef.current, previewCanvasRef.current, completedCrop)

      }
    },
    100,
    [completedCrop]
  )

  return (
    <div className={style.imageCrop}>
      <p>Configura tu imagen de perfil</p>
      <div className={style.imageCropContainer}>
        {!!completedCrop && (
          <div style={{ marginRight: 20 }}>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid grey',
                borderRadius:'100%',
                objectFit: 'contain',
                // width: completedCrop.width,
                // height: completedCrop.height,

              }}
            />
          </div>
        )}
        <ReactCrop
          aspect={1}
          onComplete={c => setCompletedCrop(c)}
          crop={crop}
          onChange={c => setCrop(c)}
        >
          <img
            onLoad={onImageLoad}
            alt='Crop'
            ref={imageRef}
            src={src}
          />
        </ReactCrop>
      </div>
      <div className={style.buttonContainer}>
      <ButtonApp onClick={() => onComplited(previewCanvasRef.current?.toDataURL())}>
        Aceptar
      </ButtonApp>
      </div>

    </div>


  )
}

export default ImageCrop
