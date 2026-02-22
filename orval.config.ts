import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: {
      target: 'https://localhost:7072/swagger/v1/swagger.json',
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
