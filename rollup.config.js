import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';

export default [
	// CommonJS
	{
		preserveModules: true,
		input: './src/index-build.ts',
		output: [
			{
				dir: './build',
				format: 'cjs'
			}
		],
		external: [
			...Object.keys(pkg.dependencies || {})
		],
		plugins: [
			babel({
				exclude: 'node_modules/**'
			}),
			typescript({
				typescript: require('typescript')
			}),
			postcss({
				plugins: [autoprefixer()],
				sourceMap: true,
				extract: true,
				minimize: true
			}),
			terser() // minifies generated bundles
		]
	}
];