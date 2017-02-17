const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
	entry: {
		app: './app'
	},
	output: {
		path: __dirname + '/public/js',
		publicPath: '/public/js/',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				options: {
					presets: [['es2015', {"modules": false}]],
					plugins:[
						["transform-react-jsx", { "pragma": "h" }]
					]
				}
			}
		]
	},
	plugins: [new HtmlWebpackPlugin({
		filename: '../../index.html',
		templateContent: '<html><head></head><body><div id="app"></div></body></html>'
	})]
};
module.exports = config;