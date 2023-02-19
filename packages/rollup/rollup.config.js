import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

/**
 * @type { import('rollup').RollupOptions }
 */
export default {
  input: ['src/index.js'],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      plugins: [terser()],
    },
  ],
  plugins: [resolve(), commonjs()],
};
