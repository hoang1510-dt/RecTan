import { defineConfig } from 'orval'
import { env } from './src/lib/env/env'

export default defineConfig({
  api: {
    input: {
      target: env.VITE_API_BASE_URL + '/swagger/v1/swagger.json' as string,
    },
    output: {
      mode: 'split',
      target: './src/lib/api/generated/endpoints.ts',
      schemas: './src/lib/api/generated/model',
      client: 'react-query',
      clean: true,
      override: {
        mutator: {
          path: './src/lib/api/orval-mutator.ts',
          name: 'customInstance',
        },
      },
    },
  },
})
