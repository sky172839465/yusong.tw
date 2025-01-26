import { ImageResponse } from '@cloudflare/pages-plugin-vercel-og/api'
// import { twj } from 'tw-to-css'
import fs from 'fs'
import path from 'path'
// eslint-disable-next-line no-unused-vars
import React from 'react'

// Load the generated TailwindCSS styles as a string
const tailwindStyles = fs.readFileSync(
  path.resolve('./src/generated.css'),
  'utf8'
)

// export default {
//   async fetch (request) {
//     const { searchParams } = new URL(request.url)
  
//     // Get dynamic query parameters (e.g., title and subtitle)
//     const title = searchParams.get('title') || 'Hello, World!'
//     const subtitle = searchParams.get('subtitle') || 'Dynamic OG Image Generation'
//     const width = searchParams.get('width') || 1200
//     const height = searchParams.get('height') || 630
  
//     return new ImageResponse(
//       (
//         // <div
//         //   style={twj`
//         //     flex size-full flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white
//         //   `}
//         // >
//         //   <h1 style={twj`text-6xl font-bold`}>
//         //     {title}
//         //   </h1>
//         //   <p className={twj`mt-4 text-2xl`}>
//         //     {subtitle}
//         //   </p>
//         // </div>
//         <div style={{ display: 'flex' }}>
//           Hello, world!
//           <br />
//           {title}
//           <br />
//           {subtitle}
//         </div>
//       ),
//       {
//         width,
//         height,
//         fonts: [
//           {
//             name: 'Inter',
//             // data: await fetchFont(), // Optional: Fetch and include a custom font
//             weight: 400,
//             style: 'normal'
//           }
//         ]
//       }
//     )
//   }
// }

export default {
  async fetch (request) {
    const { searchParams } = new URL(request.url)
  
    // Get dynamic query parameters (e.g., title and subtitle)
    const title = searchParams.get('title') || 'Hello, World!'
    const subtitle = searchParams.get('subtitle') || 'Dynamic OG Image Generation'
    return new ImageResponse(
      <div
        // className='bg-gradient-to-r from-blue-500 to-purple-600 bg-blue-600'
        // style={twj('text-white bg-black')}
        // style={{
        //   backgroundImage: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(67, 56, 202) 100%)'
        // }}
        style={{
          fontFamily: 'Inter'
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: tailwindStyles }} />
        <p className='text-6xl font-bold'>
          {`${title}  ${subtitle}`}
        </p>
        {/* <br />
        <pre>
          {JSON.stringify(twj('flex size-full flex-col items-center justify-center p-8'), null, 2)}
        </pre> */}
      </div>,
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: 'Inter',
        //     data: await fetchFont(), // Optional: Fetch and include a custom font
        //     weight: 400,
        //     style: 'normal'
        //   }
        // ],
        debug: true
      }
    )
  }
}

// Optional: Fetch a custom font
// async function fetchFont() {
//   const res = await fetch(
//     'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap'
//   )
//   return res.arrayBuffer()
// }