module.exports = {
	entry: './app.jsx',
	output: {
		filename: 'bundle.js',
		publicPath: 'http://localhost:8090/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'jsx-loader?insertPragma=React.DOM&harmony'
			},
			{
	        	test: /\.scss$/,
	        	loaders: ["style", "css", "sass"]
	      }
		]
	},
	sassLoader: {
//		includePaths: [path.resolve(__dirname, "./scss")]
	 },
	externals: {
//		'react': 'React'
	},
	devtool: "inline-source-map",	
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
}