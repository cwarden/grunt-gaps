/*
 * grunt-gaps
 * https://github.com/cwarden/grunt-gaps
 *
 * Copyright (c) 2015 Christian G. Warden
 * Licensed under the MIT license.
 */

'use strict';

var tmp = require('temporary');
var gaps = require('node-google-apps-script');
var del = require('del');
var fs = require('fs-extra');
var _ = require('underscore');

var fetch = function(projectId, dest) {
	var fetchDir = new tmp.Dir();
	var buildPath = fetchDir.path;
	return gaps.download(projectId, buildPath)
		.then(function(project) {
			var projectPath = project.path;
			fs.emptyDirSync(dest);
			fs.copySync(projectPath, dest, { clobber: true });
			fs.removeSync(buildPath);
		});
};

var pushWithoutManifest = function(projectId, srcDir) {
	var fetchDir = new tmp.Dir();
	var buildPath = fetchDir.path;

	// Fetch project and create manifest; overwrite fetched project with srcDir;
	// and re-upload.
	return fetch(projectId, buildPath)
		.then(function(project) {
			var toDelete = buildPath + '/*.{js,html}';
			del.sync([toDelete], { force: true });
			fs.copySync(srcDir, buildPath);
			return gaps.upload(buildPath);
		})
		.then(_.partial(fs.removeSync, buildPath));
};

module.exports = function(grunt) {
	grunt.registerMultiTask('gapspull', 'Download Google Apps Script Project', function() {
		var projectId = this.data.projectId;
		var destDir = this.data.dest;

		grunt.log.writeln('Getting ' + projectId + ' to ' + destDir);

		var done = this.async();
		fetch(projectId, destDir)
			.then(done);
	});

	grunt.registerMultiTask('gapspush', 'Upload Google Apps Script Project', function() {
		var projectId = this.data.projectId;
		var srcDir = this.data.src;
		var done = this.async();
		if (projectId) {
			grunt.log.writeln('Uploading ' + projectId + ' from ' + srcDir);
			return pushWithoutManifest(projectId, srcDir)
				.done(done);
		} else {
			grunt.log.writeln('Uploading ' + srcDir);
			return gaps.upload(srcDir)
				.done(done);
		}
		grunt.log.writeln('No src defined');
		done();
	});
};
