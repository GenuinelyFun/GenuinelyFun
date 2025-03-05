import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSWC from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), reactSWC(), svgr()],
  resolve: { preserveSymlinks: true },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName:
          command === 'build'
              ? '[hash:base64:5]'
              : '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      less: {
        math: "always",
        relativeUrls: true,
        javascriptEnabled: true
      },
    }
  }
})
