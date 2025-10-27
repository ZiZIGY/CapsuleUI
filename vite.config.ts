import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist/types',
      cleanVueFileName: true,
      staticImport: true,
      insertTypesEntry: true,
      copyDtsFiles: false,
      beforeWriteFile: (filePath, content) => {
        let newPath = filePath
          .replace('/src/components/', '/components/')
          .replace('/src/', '/');

        return {
          filePath: newPath,
          content: content,
        };
      },
    }),
  ],
  build: {
    cssCodeSplit: false,
    cssMinify: true,
    sourcemap: true,
  },
});
