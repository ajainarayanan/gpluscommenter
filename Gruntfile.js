module.exports = function(grunt) {
  var hbs, component;
  require("load-grunt-tasks")(grunt);
  var underscore = require("underscore");
  hbs = require("component-builder-handlebars");

  component = {
    options: {
      verbose: false,
      dev: true,
      name: "sidebar",
      sourceUrls: true,
      configure: function(builder) {
        builder.use(hbs({
          extname: ".hbs",
          partialRegex: /^_/
        }));
      }
    },
    src: ".",
    dest: "./build/"
  };

  dist = underscore.extend(underscore.clone(component), {
    options: {
      dev: false,
      verbose: true,
      name: 'sidebar',
      configure: function(builder) {
        builder.use(hbs({
          extname: ".hbs",
          partialRegex: /^_/
        }));
      }
    }
  });

  grunt.initConfig({
    componentbuild: {
      build: component,
      dist: dist
    }
  });

  grunt.registerTask("build", [
    "componentbuild:build"
  ]);
  grunt.registerTask("prod", [
    "componentbuild:dist"
  ]);
  grunt.registerTask("default", "Building sidebar...", function() {
    require("time-grunt")(grunt);
    grunt.task.run("build");
  });

  grunt.registerTask("dist", "Building sidebar in production .... ", function() {
    require("time-grunt")(grunt);
    grunt.task.run("prod");
  });
}
