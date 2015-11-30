var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var procName = process.argv[1].split('/').pop();
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// detect host
var HOST = 'localhost';
if (process.argv.indexOf('--host') != -1) {
	HOST = process.argv[process.argv.indexOf('--host') + 1];
}

// base config
var config = module.exports = {
	context: __dirname,
	entry: {
		'dist/g': './src/g.js',
		'docs/docs': './src/docs/docs.js'
	},
	output: {
		path: './',
		filename: '[name].js', // no hash in main.js because index.html is a static page
		publicPath: '/'
    },
    module: {
		loaders: [
			{
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader'
            },
			{
				test: /\.html$/,
				loader: 'ng-cache'
	      	},
		]
	},
    plugins: [
	  	new ExtractTextPlugin('[name].css')
	]
};

// dev
if (procName == 'webpack-dev-server') {
	config.devtool = '#source-map';
	config.output.sourceMapFilename = '[name].map.js';
	config.entry = {'docs' : './src/docs/docs.js'}
	
	//conf
	config.devServer = {
	   headers: { "Access-Control-Allow-Origin": "*" },
	   contentBase: 'docs/',
	   hot: true
	};

	config.module.loaders = config.module.loaders.concat([
		{
	        test: /\.scss$/,
	        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader!'
	    }
	]);
} 

// build
else {
	config.plugins = config.plugins.concat([
		new ngAnnotatePlugin({
            add: true
        }),
		new webpack.optimize.UglifyJsPlugin()
	]);

	config.module.loaders = config.module.loaders.concat([
		{
        	test: /\.scss$/,
        	loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
    	}
    ]);
}


module.exports = config;