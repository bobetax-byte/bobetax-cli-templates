// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
	preset: ['advanced', { discardComments: false }],
	plugins: [
		require('postcss-preset-env'),
		require('autoprefixer'),
		require('postcss-import'),
		require('postcss-aspect-ratio-mini'),
		require('postcss-write-svg')({ "utf8": false }),
		require('postcss-px-to-viewport')({
			viewportWidth: 375,     // (Number) The width of the viewport.
			viewportHeight: 667,    // (Number) The height of the viewport.
			unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
			viewportUnit: 'vw',     // (String) Expected units.
			selectorBlackList: ['.ignore', '.c-px', ':before', ':after'],  // (Array) The selectors to ignore and leave as px.
			minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
			mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
		 }),
		require('cssnano')({
			preset: 'default',
		}),
	]
};
