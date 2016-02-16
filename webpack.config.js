var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var procName = process.argv[1].split('/').pop();
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');

// detect host
var HOST = 'localhost';
if (process.argv.indexOf('--host') != -1) {
	HOST = process.argv[process.argv.indexOf('--host') + 1];
}

var PORT = '8080';
if (process.argv.indexOf('--port') != -1) {
	PORT = process.argv[process.argv.indexOf('--port') + 1];
}

// base config
var config = module.exports = {
	context: __dirname,
	entry: {
		'dist/g': ['./src/g.js'],
		'docs/docs': ['./src/docs/docs.js']
	},
	output: {
		path: './',
		filename: '[name].js', // no hash in main.js because index.html is a static page
		publicPath: '/'
    },
    resolve: {
		modulesDirectories: ['src', 'web_modules', 'node_modules']
	},
    module: {
		loaders: [
			{
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url'
            },
			{
				test: /\.html$/,
				loader: 'ng-cache'
	      	}
		]
	},
    plugins: [
	  	new ExtractTextPlugin('[name].css')
	]
};

// dev
if (procName == 'webpack-dev-server') {
	
	// redefine entry
	config.entry = {'docs' : ['./src/docs/docs.js']}

	// source maps
	config.devtool = '#source-map';
	config.output.sourceMapFilename = '[name].map.js';

	// hot mode
	config.entry['docs'].unshift('webpack-dev-server/client?http://' + HOST + ':' + PORT);
	config.entry['docs'].unshift('webpack/hot/dev-server');
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

	config.module.loaders.push({
        test: /\.scss$/,
        loaders: ['style/url', 'file?name=[name].css?[hash]', 'autoprefixer', 'sass', 'import-glob']
    });
	
	//conf
	config.devServer = {
	   	headers: { "Access-Control-Allow-Origin": "*" },
	   	contentBase: path.join(__dirname, 'docs'),
	   	hot: true,
	   	noInfo: true,
	   	stats: {
			colors: true
		}
	};
} 

// build
else {
	config.module.loaders.push({
        test: /\.scss$/,
        loaders: ['file?name=[name].css?[hash]', 'autoprefixer', 'sass', 'import-glob']
    });

	config.plugins = config.plugins.concat([
		new ngAnnotatePlugin({
            add: true
        }),
		new webpack.optimize.UglifyJsPlugin(),
		//new MoveGeneratedFiles()
	]);
}

function MoveGeneratedFiles(options) {
  // Setup the plugin instance with options...
}

MoveGeneratedFiles.prototype.apply = function(compiler) {
	
	compiler.plugin('after-emit', function() {

		for (entry in config.entry) {
			var dir = entry.split('/')[0]
			var name = entry.split('/')[1] + '.css';
			var oldPath = path.join(__dirname, name);
			var newPath = path.join(__dirname, dir, name);
			fs.renameSync(oldPath, newPath);
		}
	});
};


module.exports = config;