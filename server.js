var express = require('express');
var httpProxy = require('http-proxy');
var request = require('request');
var app = express();
var proxy = httpProxy.createProxyServer({
	target : 'https://api.supporter.com'
});

////////// STATIC FILES CONFIGURATION //////////



switch(app.get('env')) {
	case 'development':
		app.use(express.static(__dirname + '/app', {
			maxAge : 0
		}));
		break;
	case 'phonegap':
		app.use(express.static(__dirname + '/platforms/browser/www', {
			maxAge : 0
		}));
		break;
	case 'production':
		app.use(express.static(__dirname + '/www', {
			maxAge : 0
		}));
		app.use(express.compress());
		break;
	default:
		return;
}

////////// PROXY SERVER CONFIGURATION //////////

app.all(/v2\//, function(req, res, next){
	//proxy.web(req,res);
	var url = 'https://api.supporter.com' + req.url;
	reqpipe(req, url, res);
});

app.all(/lang\//, function(req, res, next){
	//proxy.web(req,res);
	var url = 'https://static.supporter.com' + req.url;
	reqpipe(req, url, res);
});

function reqpipe(req, url, res) {
	var start = new Date();
	var operation = start.toLocaleTimeString() + ' → ' + url;
	process.stdout.write(operation);
	
	req.pipe(request(url)).pipe(res);	
	
	var timelapse = ' [' + (new Date()- start) + " ms]";
	var cols = process.stdout.columns;
	var padding = cols - operation.length - timelapse.length;
	padding = (padding % cols + cols) % cols;
	
	process.stdout.cursorTo(0);
	console.log(operation + new Array(padding).join(' ') + timelapse);
}


////////// STARTING SERVER //////////

app.listen(process.env.PORT || 3000);

console.log("Node.js is running in " + app.get('env'));

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});

////////// STARTING LESS WATCH //////////

(
	function() {

		var mainLessFile = "main.less";

		var lessDir = __dirname + '/app/less', cssDir = __dirname + '/app/css';

		var less = require('less'), LessParser = less.Parser, path = require('path'), join = path.join, fs = require('fs'), onModify, relations = {}, watch;

		var onModify = function(filename) {
			console.log('Changed', filename);
			if (relations[filename])
				filename = relations[filename];
			console.log('Which relate on', filename);
			var path, lessParser, contents;

			path = join(lessDir, filename);
			if (!filename.match(/\.less$/) || !fs.statSync(path).isFile())
				return;

			lessParser = new LessParser({
				paths : [lessDir],
				filename : filename
			});

			contents = fs.readFileSync(path).toString();
			lessParser.parse(contents, function(err, tree) {
				if (err) {
					throw new Error(err);
				}
				var cssFilename = filename.replace(/less$/, 'css');
				fs.writeFileSync(join(cssDir, cssFilename), tree.toCSS());
				// Relations
				tree.rules.forEach(function(rule) {
					if (rule.path) {
						watch(rule.path);
						relations[rule.path] = filename;
					}
				});
			});
		};

		var watch = function(filename) {

			if (relations[filename])
				return;

			var path;

			if ( typeof (filename) != "string") {
				filename = filename.value;
			}

			if (filename.charAt(0) == '/')
				path = filename;
			else
				path = join(lessDir, filename);

			fs.watch(path, function() {
				onModify(mainLessFile);
			});
		};

		watch(lessDir);

	})();

