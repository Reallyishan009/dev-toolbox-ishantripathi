import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy:{
      '/api': 'http://localhost:5050', // Proxy API requests to the backend server || change it with your backend server URL
    }
  },
  plugins: [react()],
})
