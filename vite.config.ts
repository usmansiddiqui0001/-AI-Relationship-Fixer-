import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/<YOUR-REPO-NAME>/', // Replace <YOUR-REPO-NAME> with your repository name
})
