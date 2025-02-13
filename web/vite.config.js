import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

// https://vite.dev/config/
export default ({ mode }) => {
  const base_path = process.env.VITE_BASE_PATH || './';

  return defineConfig({
    base: base_path,

    server: {
      host: '0.0.0.0',
      port: 5123,
    },

    plugins: [
      vue(),
      Components({
        resolvers: [
          PrimeVueResolver()
        ]
      }),
    ],
  })
}
