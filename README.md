# grunt-gaps

> Grunt plugin for node-google-apps-script

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gaps --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gaps');
```

## The "gapspull" task

### Overview
In your project's Gruntfile, add a section named `gapspull` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gapspull: {
    your_project: {
      dest: "build/project",
      projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXX-XXX"
    },
  },
});
```

### Options

#### options.dest
Type: `String`

A string with the name of the destination directory.

#### options.projectId
Type: `String`
Default value: `'.'`

A string containing the project id.


## The "gapspush" task

### Overview
In your project's Gruntfile, add a section named `gapspush` to the data object passed into `grunt.initConfig()`.

There are two ways to use the `gapspush` task.  It can push a directory
containing a `.manifest.json` by passing only a `src` option.  The
`.manifest.json` file will be created automatically in the `dest` directory
when using the `gapspull` task (or using the `gaps` CLI directly).

Alternatively, if you set both the `src` option and the `projectId`, the
project will first be fetched from Google Drive, creating the .manifest.json
file, overwritten with the contents of the `src` directory, then pushed back up
to Google Drive.

```js
grunt.initConfig({
  gapspush: {
    build: {
      src: "build/project"
    },
    your_project: {
      src: "src/project",
      projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXX-XXX"
    },
  },
});
```

### Options

#### options.src
Type: `String`

A string with the name of the destination directory.

#### options.projectId
Type: `String`

A string containing the project id.

## Release History
_(Nothing yet)_

## Credits

Dan Thareja's
[node-google-apps-script](https://github.com/danthareja/node-google-apps-script)
does most of the work.
