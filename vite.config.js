import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import mdPlugin from 'vite-plugin-markdown'
import sitemapPlugin from 'vite-plugin-sitemap'

import { homepage } from './package.json'
import routes from './src/data/routes.json'

const routePaths = routes.map(route => route.path)


// https://vitejs.dev/config/
export default ({ mode }) => {
  const isProd = mode === 'production'

  return defineConfig({
    plugins: [
      react(),
      mdPlugin.plugin({ mode: 'html' }),
      sitemapPlugin({
        hostname: homepage,
        dynamicRoutes: routePaths
      })
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()]
      }
    },
    define: {
      'window.IS_PROD': `${isProd}`
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  })
}
