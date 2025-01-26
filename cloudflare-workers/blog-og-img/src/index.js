import { ImageResponse } from '@cloudflare/pages-plugin-vercel-og/api'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { twj } from 'tw-to-css'

export default {
  async fetch (request) {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Hello, World!'
    const subtitle = searchParams.get('subtitle') || 'Dynamic OG Image Generation'
    const width = searchParams.get('width') || 1200
    const height = searchParams.get('height') || 630
    let component
    try {
      component = (
        <div
          style={{
            fontFamily: 'Noto Sans TC',
            fontWeight: 400,
            backgroundImage: `linear-gradient(
              to bottom,
              #ffffff 5%,
              #e17100 40%,
              #000000 100%
            )`,
            ...twj('flex text-white w-full h-full items-center justify-center')
          }}
        >
          <h1
            style={{
              fontSize: 40,
              ...twj('font-bold text-white drop-shadow-lg')
            }}
          >
            {`${title}  ${subtitle} 好喔`}
          </h1>
          <img
            src='data:image/svg+xml,<svg width="512" height="512" version="1.0" viewBox="0 0 547.73 768.83" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-227.88 885.93) scale(.1 -.1)"><path d="m3202 8832c-210-109-283-291-191-474 31-60 31-62 24-172-6-98-4-125 19-226 35-159 72-294 91-329 16-31 21-156 7-165-11-7-160 80-203 119-21 19-63 51-94 71-37 25-55 44-55 58-1 33-38 108-73 144-74 77-193 107-347 86-52-7-96-13-97-13-21-7 48-141 113-224 55-69 80-83 173-98 59-9 80-8 125 5 30 9 60 16 68 16 12 0 127-79 193-133 17-14 59-44 95-67 72-47 173-130 167-136-2-3-33 5-68 15-35 11-89 23-119 27-30 3-64 14-75 24-70 61-217 51-322-21-72-50-174-197-160-233 19-49 271-69 359-29 73 33 123 79 158 144 17 32 34 59 38 59 3 0 51-14 105-31 76-25 102-38 115-58 9-14 38-51 64-81 30-34 54-73 63-103 11-38 37-73 115-159 56-61 110-129 122-151 36-71 128-201 182-257 58-60 101-121 136-190 12-24 41-62 64-85 61-59 156-207 172-267 11-43 25-63 81-118 40-38 83-92 103-129 19-36 63-94 96-130 34-36 74-86 89-110 15-25 51-73 79-107 28-35 61-76 72-91 29-38 81-144 111-223 13-36 34-81 45-100 20-33 21-50 21-245-1-306-35-1064-52-1140-30-132-41-302-42-630 0-187-5-383-10-435-11-92-17-184-38-550-5-96-14-188-20-203-6-16-11-56-11-90s-5-138-12-231c-14-210-20-201 127-190 55 4 138 6 185 5 62-2 103 3 150 18 36 11 90 23 120 27s68 13 84 19c21 9 38 10 58 3s47-6 96 6c37 8 82 18 100 21 23 5 34 13 38 30 8 33-1 56-52 125-24 34-54 85-65 114-11 30-35 74-53 98-45 59-76 122-76 155 0 15-17 66-36 113-73 172-76 184-81 345-4 118-2 163 11 212 22 82 23 167 3 225-14 41-16 99-13 445 2 378 4 402 25 483 13 47 26 92 29 100 9 26 1 241-13 334-17 111-3 389 25 516 10 47 24 119 30 160 12 77 37 131 110 240 21 30 46 73 58 95 11 22 53 74 94 116 265 276 331 353 409 481 92 149 116 175 241 259 72 48 132 80 155 84 21 4 75 15 120 26 45 10 104 19 132 19s59 4 69 10c44 24 222 50 340 50h121l43-43c91-91 264-122 414-76 38 12 73 23 77 26 27 16-129 168-192 188l-23 7 28 18c44 27 77 67 71 84-5 13-26 16-113 16-137 0-176-12-241-75-44-43-56-50-85-47-18 2-62-1-98-7-36-7-106-13-155-15-61-2-108-10-145-24s-77-21-120-21c-36 0-97-4-137-10-78-12-129-2-120 22 17 44 171 277 186 282 29 9 204 192 227 238 15 28 43 56 87 87 35 25 91 65 123 90 33 25 90 66 127 91l69 47 98-5c94-6 101-4 162 24 34 17 85 49 111 73 49 44 119 138 131 177 6 19 2 23-36 33-24 6-56 16-71 22-35 14-146 5-229-18-86-24-158-94-184-177l-18-58-141-94c-78-52-145-95-150-95-4 0-5 61-1 136l7 137 39 44c46 53 80 136 80 196 0 101-62 246-135 317-52 51-59 50-112-18-54-71-77-144-77-252-1-123 17-173 86-235l50-45-6-62c-22-219-25-228-81-303-51-68-150-167-233-232-22-18-55-55-73-83-18-27-36-50-39-50-9 0-30 134-30 184 0 19 7 50 15 69 8 20 15 61 15 91 0 46-6 62-41 116-24 34-60 73-83 87-22 15-57 37-77 50-19 13-38 23-41 23-24 0-40-182-22-264 15-71 80-143 146-159 31-8 34-18 43-173l6-102-34-45c-19-25-49-71-67-102-18-32-56-78-84-104-111-100-398-399-418-435-4-7-33-33-65-56-32-24-76-60-98-81-22-20-94-73-160-118s-132-91-146-102c-34-27-146-46-195-33-30 7-44 20-73 65-63 100-114 154-201 218-80 58-216 166-269 214-14 12-50 60-81 107-30 47-80 110-110 140-31 30-70 83-89 118-18 35-58 91-88 125-91 101-92 107-95 383l-1 239 45 48c66 69 82 107 86 210 4 98-2 144-22 172-13 18-14 18-49-4-53-32-153-144-167-186-20-61-9-156 23-198 27-35 27-38 26-174-1-76-4-167-8-203l-6-65-49 57c-27 31-77 80-112 108-36 29-81 78-103 113-22 34-51 76-64 92-13 17-39 59-57 95-19 39-62 95-104 140-63 65-82 96-149 232-42 86-77 165-77 176 0 12-5 33-10 48-6 14-19 63-29 108-10 44-28 104-38 131l-20 50 28 145c17 92 32 146 41 149 7 2 36 27 65 56 61 63 83 123 83 227v68h-31c-31 0-31 0-23 38 19 79 11 162-25 260-39 106-43 108-129 64zm38-31c0-5-16-42-36-82-41-83-99-252-109-320-13-86-34-88-74-5-30 61-28 146 5 216 14 30 33 63 41 73 15 16 17 15 35-14 23-38 32-34 16 9-10 25-9 36 2 58 25 45 120 97 120 65zm69-74c49-130 39-219-35-320-33-45-114-97-151-97-18 0-15 31 10 130l22 85 45 15c74 26 78 30 23 24-63-7-63-5-27 81 14 33 34 84 45 113 11 28 24 52 28 52 5 0 22-37 40-83zm30-309c-7-13-23-40-37-62-20-32-46-94-78-185-10-30-27 8-25 59 1 50 3 55 73 130 40 44 74 79 76 79 1 1-3-9-9-21zm39-61c-3-35-15-81-26-104-25-49-95-111-100-89-5 23 58 166 73 166 8 0 11 7 8 18-4 16 30 72 44 72 3 0 3-28 1-63zm-206-121c-3-37 1-62 12-78 14-21 13-29-5-91-12-37-25-67-29-67-12 0-50 119-50 156 0 67 13 123 29 127 43 12 46 9 43-47zm-86-173c26-124 61-240 75-254 10-10 22-42 29-72 6-30 17-63 25-73 8-11 15-35 15-53 1-97 151-434 229-516 22-22 51-63 65-92 35-70 198-283 264-346 117-111 148-145 187-200 22-32 45-70 50-86 6-16 45-64 89-107 43-44 90-97 104-119 72-115 118-177 141-191 14-9 51-57 81-106 62-102 161-201 280-281 97-65 161-127 212-202 23-33 56-78 74-99 32-37 37-39 102-43 122-8 228 51 482 266 30 26 71 57 90 68 49 30 269 258 309 320 20 31 80 91 149 150 94 80 120 108 140 151 13 30 49 82 79 115 31 34 60 72 66 85 6 12 13 22 17 22s24 24 44 54c21 29 54 63 75 75 42 23 211 203 263 280 28 41 33 59 42 156 9 87 13 103 19 77 4-19 2-77-4-129s-8-98-5-101c13-12 139 68 253 160 67 55 93 69 93 50 0-5-30-30-67-58-64-47-85-62-241-167-47-31-80-62-96-90-22-37-152-169-229-234-14-12-38-45-52-73-15-31-40-60-64-76-27-17-51-47-75-94-20-37-36-75-36-83s16-23 37-32c32-15 55-17 196-10 115 5 158 4 153-4-4-6-22-11-39-11-47-1-254-44-334-71-38-13-88-39-113-59s-73-52-107-70c-60-31-63-34-93-109-48-120-71-159-130-220-51-52-109-90-142-92-7 0-25-26-40-58-34-71-81-136-109-151-19-11-20-10-14 12 5 20 3 20-17-7-13-16-51-60-84-97-59-64-95-121-200-312-50-91-74-116-74-76 0 71-65-60-80-162-5-32-16-65-24-74-18-17-21-34-6-34 5 0 20-18 32-40 27-46 35-49 48-16 5 14 19 25 36 29l27 5-7-76c-4-41-6-181-4-311 5-433 5-459-20-538-18-58-22-96-22-210-1-76-4-156-8-178-5-22-4-56 0-75 5-19 11-111 12-205 2-93 9-192 15-219 14-60 6-103-20-111-21-7-25-21-33-115-8-96-50-224-81-244-32-21-32-46 0-76 14-13 25-31 25-41 0-9 9-27 19-40 19-23 21-23 37-7 13 13 20 40 24 95 6 81 13 75 25-20 7-51 39-150 77-237 14-30 30-81 37-112 8-37 29-81 58-125 25-37 54-93 65-123 10-30 34-71 52-90 37-38 61-79 52-87-11-11-37 8-54 38-9 17-31 50-48 72-16 23-40 67-53 98-12 30-40 77-61 103-28 34-40 58-41 82-1 19-3 39-4 44-1 6-3 15-4 20-1 12-84 50-107 50-8 0-14-7-14-15 0-9-7-27-16-40-20-30-13-81 17-118 11-14 27-43 35-64 19-45 157-254 185-279 10-9 19-20 19-23s-26-7-57-8c-32-1-69-3-83-4-38-2-70 15-186 101-52 38-91 46-136 27-46-19-69-54-88-131l-16-61-44-7c-25-4-59-10-77-13-42-8-54 14-43 77 23 122 42 308 50 496 4 114 14 222 20 240 10 26 10 53 0 127-16 119 4 326 34 364 17 22 13 664-4 697-12 21-9 44 24 182 20 86 41 161 47 167 5 5 9 121 9 270 0 275 22 724 39 813 6 29 15 61 21 72 16 29 14 131-3 171-8 19-27 55-43 80-16 24-47 80-69 124s-56 101-75 127c-111 152-207 277-235 308-19 20-35 51-39 72-5 29-19 48-63 85-32 27-80 68-108 94-27 25-62 52-76 61-17 11-28 29-32 50-3 19-26 79-53 134-40 84-57 109-117 164-51 47-78 81-98 125-16 36-69 111-132 185-57 69-129 164-160 210-31 47-97 128-146 180-50 52-91 99-91 103 0 7-42 99-122 264-20 40-82 98-181 167-54 37-97 70-94 72 2 2 38-16 79-41s82-45 90-45c9 0 21 13 27 28 14 34-6 141-44 232-13 30-26 78-30 105-4 28-19 88-35 135-29 89-44 180-29 180 5 0 11-12 15-27zm-536-146c85-20 164-76 195-137 41-82 31-86-61-27-86 57-283 140-318 135-14-2 1-11 44-27 72-26 200-91 200-102 0-4-29-15-65-24-36-10-68-22-72-28-3-5 3-7 13-4 11 3 51 13 91 22 71 17 73 17 107-4 60-38 64-49 20-67-105-44-184-27-266 58-58 61-108 135-108 162 0 8 9 20 19 26 16 8 91 24 136 29 6 0 35-5 65-12zm4387-301c24-37 25-41 9-67-22-37-20-46 5-23 25 22 33 12 49-59 13-64 13-91-5-156-13-50-66-123-79-110-3 3-8 24-12 47-5 32-3 42 7 42 16 0 83 99 74 108-6 7-22-10-55-57-8-11-17-21-20-21-11 0-51 336-43 358 7 17 37-9 70-62zm-83-96c21-179 26-330 10-330-26 0-91 78-102 123-13 48-17 219-6 230 4 3 16 0 28-8 23-17 46-20 46-6 0 5-11 12-24 15s-26 12-29 20c-7 18 41 122 52 110 4-5 15-74 25-154zm-3962 70c29-28 43-46 31-41-12 6-45 34-75 61-29 28-43 46-31 41 12-6 45-34 75-61zm-1-244 54-24-28-11c-16-6-32-11-36-11-12 0-256-97-300-120-22-11-45-20-51-20-28 0 64 119 121 157 87 57 158 66 240 29zm4734-67 40-11-105-38c-58-20-113-41-123-45-17-7-18-4-11 31 3 22 9 43 11 47 15 26 119 35 188 16zm-4645-4c0-3-9-23-19-44-25-48-83-101-145-130-43-21-58-23-144-19-96 5-152 21-152 42 0 6 24 21 53 33 91 39 88 39 81 4-9-42 0-39 27 9 25 45 60 62 184 90 85 20 115 23 115 15zm1188-37c11-34 3-149-15-193-13-34-76-125-85-125-21 0 21 188 58 263 31 60 25 73-9 20-28-44-61-143-71-215-4-27-11-48-15-48-31 0-42 140-15 196 18 38 109 134 128 134 6 0 17-15 24-32zm3242-13c0-24-7-43-22-57-33-29-130-90-136-84-10 11 29 93 54 115 29 25 85 61 97 61 4 0 7-16 7-35zm290 11c0-8-23-42-51-76-46-56-53-61-80-55-18 4-29 3-29-4 0-6 5-11 10-11 29 0 2-25-57-52-61-27-75-30-141-26-40 3-75 8-79 12-31 31 167 149 337 202 91 28 90 27 90 10zm-1442-280c46-29 100-89 117-130 17-40 12-133-8-153-14-14-17-12-32 23-9 21-23 55-30 75s-23 56-36 80c-19 35-24 40-27 23-2-16-9-20-33-16-38 6-42 13-34 72s24 64 83 26zm-1-134c12-14 40-84 57-140 7-20 5-21-18-12-66 25-95 63-121 157-6 20-3 22 32 16 21-3 44-12 50-21zm-2198-284c-1-81-2-82-10-33-8 46-4 115 6 115 3 0 4-37 4-82zm3371-267c0-16-6-33-12-39-14-11-148-28-148-19 0 3 24 21 53 40 45 30 69 41 100 46 4 0 7-12 7-28zm160 20c0-19-77-61-113-61-40 0-43 6-25 45 10 23 16 25 75 25 34 0 63-4 63-9zm-42-115c49-25 136-95 128-103-2-2-21 4-43 15-35 17-137 42-240 57-61 9-56 30 11 46 57 13 96 9 144-15zm-408-15c0-12-37-21-92-21-72 0-68 18 4 23 35 2 69 4 76 5 6 1 12-2 12-7zm-192-17c-8-8-149-44-172-44-38 0 1 22 61 35 62 14 120 19 111 9zm491-33c20-5 24-14 28-60 4-51 4-53-19-46-35 11-101 45-120 63-10 8-18 23-18 34 0 15 8 18 53 17 28-1 63-4 76-8zm151-31c13-7 20-21 20-39 0-32-18-41-81-41-33 0-37 3-43 31-13 68-11 72 39 65 25-3 55-10 65-16zm74-24c37-13 38-14 18-25-25-13-52-14-52-2 0 5-3 16-6 25-7 19-9 19 40 2zm-2054-845c0-5-20-31-45-58-44-50-167-241-179-281-8-23-34-48-42-40s104 207 144 258c44 54 113 130 118 130 2 0 4-4 4-9zm-689-385c11-32 17-66 14-74-9-24-22-3-40 63-8 33-18 69-21 80-6 18-5 19 10 5 9-9 25-42 37-74zm305-3143c-7-17-8-17-17 0-12 21-2 44 13 29 6-6 8-19 4-29zm-181-313c4-6-7-28-24-49s-31-42-31-45c0-12 28-6 40 9 17 21 29 19 39-7 15-41 4-48-80-48-43 0-79 2-79 4 0 17 36 82 61 111 31 34 62 45 74 25z"/><path d="m4640 5475c0-15 31-62 54-84 36-34 32-17-10 40-34 46-44 56-44 44z"/><path d="m4882 5363c20-43 174-285 202-318l26-30 40 44c22 24 37 48 34 53s-12 4-20-3c-18-15-45-4-38 15 8 20-24 51-59 60-15 4-34 14-43 24-62 71-77 90-91 113s-60 62-51 42z"/><path d="m4810 5241c0-18 80-194 96-212 8-9 23-39 33-65 13-35 25-50 40-52 29-5 27 23-3 62-13 17-38 66-56 108-17 43-45 94-61 114s-29 41-29 45c0 5-4 9-10 9-5 0-10-4-10-9z"/><path d="m5398 5123c-38-42-118-183-118-209 0-11 29-2 42 14 23 25 118 200 118 216 0 14-18 4-42-21z"/><path d="m5161 4270c-12-7-10-14 7-42l22-33v30c0 39-12 56-29 45z"/><path d="m4931 4177c-5-12-10-54-12-92-3-55-1-70 10-70 20 0 39 61 40 128 1 45-2 57-14 57-9 0-19-10-24-23z"/><path d="m5195 3921c-7-12 41-121 53-121 11 0-8 73-28 109-12 23-16 25-25 12z"/><path d="m5008 3839c-22-12-23-33-3-53 24-23 45-9 45 30 0 35-11 42-42 23z"/><path d="m5189 3534c-20-52-42-148-44-201-2-28-5-55-8-60-3-4-8-29-12-56-9-57 13-100 48-95 18 2 23 11 25 48 2 24-1 63-7 86-8 30-8 56 0 90 23 105 32 195 21 206-8 8-14 3-23-18z"/><path d="m4875 3303c-3-27-11-84-17-128-7-44-12-117-13-161 0-67 4-86 19-103 27-30 36-26 36 14 0 55 18 41 25-20 4-30 12-55 18-55 14 0 3 132-32 395-6 39-10 78-10 88-2 37-20 15-26-30z"/><path d="m5060 2462c0-19 12-42 22-42 14 0 5 43-9 48-7 2-13-1-13-6z"/><path d="m4840 2343c0-33 25-141 34-150 4-4 14 1 23 10 14 14 15 23 4 70-18 82-61 131-61 70z"/><path d="m4790 2009c0-33 22-109 31-109 11 0 12 14 2 24-4 3-6 29-4 56 2 40-1 50-13 50-9 0-16-9-16-21z"/><path d="m5165 1860c-3-5 1-10 9-10 9 0 16 5 16 10 0 6-4 10-9 10-6 0-13-4-16-10z"/><path d="m4860 1613c-16-63-28-153-21-153 5 0 22 64 48 178 10 44-15 21-27-25z"/><path d="m4942 1488c-16-16-15-48 2-48 16 0 29 41 18 52-5 5-13 3-20-4z"/><path d="m2600 7846c0-20 5-36 10-36 6 0 10 13 10 29 0 17-4 33-10 36-6 4-10-8-10-29z"/></g></svg>'
            width={150}
            height={150}
          />
        </div>
      )
    } catch (e) {
      console.log(e)
      component = (
        <div style={{ color: 'green' }}>
          {`${title} ${subtitle}`}
        </div>
      )
    }

    return new ImageResponse(
      component,
      {
        width,
        height,
        fonts: [
          {
            name: 'Noto Sans TC',
            data: await fetchFont(`${title}${subtitle}`), // Optional: Fetch and include a custom font
            style: 'normal'
          }
        ]
        // debug: true
      }
    )
  }
}

// Optional: Fetch a custom font
const fetchFont = async (text) => {
  // Step 1: Fetch the Google Font CSS
  const fontCssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+TC&text=${encodeURIComponent(text)}`
  const fontCss = await fetch(fontCssUrl).then((res) => res.text())

  // Step 2: Extract the font file URL (e.g., .woff2) from the CSS
  const fontFileMatch = fontCss.match(/url\((https:\/\/[^)]+\.ttf)\)/)
  if (!fontFileMatch) {
    return new Response('Font file URL not found in Google Fonts CSS', {
      status: 500
    })
  }
  const fontFileUrl = fontFileMatch[1]

  // Step 3: Download the font file
  const fontData = await fetch(fontFileUrl).then((res) => res.arrayBuffer())
  return fontData
}
