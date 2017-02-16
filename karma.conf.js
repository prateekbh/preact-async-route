module.exports = function(config) {
	config.set({
		frameworks: ['mocha', 'chai-sinon'],
		reporters: ['mocha'],
		browsers: ['PhantomJS'],

		files: ['tests/**/*.js'],

		preprocessors: {
			'{src,tests}/**/*.js': ['webpack', 'sourcemap']
		},

		webpack: {
			module: {
				loaders: [{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}]
			},
			resolve: {
				alias: {
					src: __dirname+'/src'
				}
			}
		},

		webpackMiddleware: {
			noInfo: true
		}
	});
};
