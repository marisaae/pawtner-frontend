import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({server: {
  watch: {
    usePolling: true,
  },
  port: 3000,
  proxy: {
    '/api': 'http://localhost:5000',
  },
},
  plugins: [react()],
})
