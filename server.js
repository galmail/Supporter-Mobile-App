var express = require('express');
var app = express();

app.set('development');

// Use compress middleware to gzip content
app.use(express.compress());

// Serve up content from public directory

app.use(express.static(__dirname + '/app', {
	maxAge : 0
}));

app.listen(process.env.PORT || 3000);

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});

/*********** LESS WATCH *************/

(function() {

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

