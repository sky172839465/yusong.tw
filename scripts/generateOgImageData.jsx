import fs from 'fs'
import { concat } from 'lodash-es'
import { tryit } from 'radash'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import satori from 'satori'
import { twj } from 'tw-to-css'

const routes = JSON.parse(fs.readFileSync('src/data/routes.json', 'utf-8'))
const favicon = fs.readFileSync('public/favicon.svg', 'utf-8').replace(/>\s+</g, '><')

const getOgImgComponent = (route) => {
  const { data = {} } = route
  const { title, tags = [] } = data
  const isNoTags = tags[0] === false
  const OgImg = (
    <div
      style={{
        fontFamily: 'Noto Sans TC',
        fontWeight: 700,
        ...twj('flex flex-col w-full bg-white')
      }}
    >
      <div
        style={{
          fontSize: '70px',
          ...twj('flex h-[84%] items-center justify-center px-10')
        }}
      >
        {title}
      </div>
      <div style={twj('flex h-[16%] w-full items-center justify-between bg-black px-8 text-white')}>
        <div style={twj('flex items-center gap-2')}>
          <div style={twj('flex rounded-md bg-white p-2')}>
            <img
              style={twj('rounded-sm')}
              src={`data:image/svg+xml,${favicon}`}
              width={50}
              height={50}
            />
          </div>
          <span
            style={{
              fontSize: '30px',
              ...twj('flex')
            }}
          >
            YUSONG.TW
          </span>
        </div>
        <div
          style={{
            fontSize: '20px',
            ...twj(`flex gap-6 ${isNoTags ? 'hidden' : ''}`)
          }}
        >
          {tags.map((tag, index) => (
            <div
              style={{
                border: '4px solid white',
                ...twj('flex rounded-md p-2')
              }}
              key={index}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  return OgImg
}

const IMAGE_TYPE = {
  OG: 'og',
  X: 'x'
}

const IMAGE_FILE = {
  [IMAGE_TYPE.OG]: 'og.svg',
  [IMAGE_TYPE.X]: 'x.svg'
}

// eslint-disable-next-line react-refresh/only-export-components
const DIMENSIONS = {
  [IMAGE_TYPE.OG]: { width: 1200, height: 630 },
  [IMAGE_TYPE.X]: { width: 1200, height: 628 }
}

const fontData = fs.readFileSync('scripts/fonts/NotoSansTC-Regular.ttf')

const generateSVG = async (route, imageType) => {
  const { file } = route
  const imageFile = IMAGE_FILE[imageType]
  const ogImgPath = file.replace(/index.jsx|index.md/, `images/${imageFile}`)
  const Component = getOgImgComponent(route)
  const svg = await satori(Component, {
    fonts: [
      {
        name: 'Noto Sans TC',
        data: fontData,
        style: 'normal'
      }
    ],
    ...DIMENSIONS[imageType]
  })

  const outputDir = ogImgPath.replace(imageFile, '')
  const [error] = await tryit(() => fs.promises.access(outputDir))()
  if (error) {
    await fs.promises.mkdir(outputDir, { recursive: true })
  }
  
  return fs.promises.writeFile(ogImgPath, svg)
}

const [error] = await tryit(() => {
  return Promise.all(concat(...[IMAGE_TYPE.OG, IMAGE_TYPE.X].map((imageType) => {
    return routes.map((route) => generateSVG(route, imageType))
  })))
})()

if (error) {
  console.log(error)
}
