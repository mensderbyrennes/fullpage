/*jslint nomen: true*/
/*global require, module,  __dirname */

module.exports = function (grunt) {
    'use strict';
    
    var path = require('path');

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var packageJson = grunt.file.readJSON('package.json');
    
    var project = {
        build: './build',
        dist: './dist',
        app: './src',
        bower: './bower_components'
    };

    // Configure Grunt
    grunt.initConfig({

        pkg: packageJson,
        project: {
            build: './build',
            dist: './dist',
            app: './src',
            bower: './bower_components'
        },


        /*************************************************/
        /** TASK USED IN GRUNT SERVE                    **/
        /*************************************************/
        express: { // create a server to localhost
            dev: {
                options: {
                    bases: ['<%= project.build%>', '<%= project.app%>', __dirname],
                    port: 9000,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            },
            prod_check: {
                options: {
                    bases: [__dirname + '/<%= project.dist%>'],
                    port: 3000,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },

        open: { // open application in Chrome
            dev: {
                path: 'http://localhost:<%= express.dev.options.port%>'
            }
        },

        watch: { // watch files, trigger actions and perform livereload
            dev: {
                files: ['<%= project.app%>/index.ejs', '<%= project.app%>/scripts/**/*.js', '<%= project.app%>/**/*.less', '<%= project.app%>/views/**/*.html'],
                tasks: [
                    'less:dev',
                    'ejs',
                    'jshint'
                ],
                options: {
                    livereload: true
                }
            },
            prod_check: {
                files: ['<%= project.dist%>/**'],
                options: {
                    livereload: true
                }
            }
        },

        less: {
            dev: {
                options: {
                    paths: ["<%= project.dist%>/styles"]
                },
                files: {
                    "<%= project.build%>/styles/style.css": "<%= project.app%>/**/*.less"
                }
            }
        },

        jshint: {
            dev: [
                '<%= project.app%>/**/*.js',
                'Gruntfile.js'
            ]
        },

        clean: { // erase all files in dist and build folder
            dist: ['<%= project.dist%>', '<%= project.build%>'],
            dev: ['<%= project.build%>']
        },

        useminPrepare: {
            html: {
                src: ['<%= project.build%>/index.html']
            },
            options: {
                dest: '<%= project.dist%>',
                staging: '<%= project.build%>',
                root: 'src',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        usemin: {
            html: [
                '<%= project.dist%>/index.html'
            ],
            options: {
                assetsDirs: ['<%= project.dist%>']
            }
        },

        concat: { // concatenate JS files in one
            generated: {},
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            }

        },

        wiredep: { // Inject bower components in index.html
            app: {
                src: ['<%= project.app%>/index.ejs'],
                ignorePath: /\.\.\//
            }
        },

        cssmin: {},

        filerev: { // change the name of files to avoid browser cache issue
            options: {
                algorithm: 'md5',
                length: 8
            },
            css: {
                src: '<%= project.dist%>/styles/*.css'
            },
            js: {
                src: '<%= project.dist%>/scripts/*.js'
            }
        },

        copy: { // Copy files (images, ...)
            dist: {
                files: [
                    { //assets,
                        cwd: '<%= project.app%>',
                        flatten: false,
                        expand: true,
                        src: ['assets/**/*.*'],
                        dest: '<%= project.dist%>'
                    },
                    {
                        cwd: '<%= project.build%>',
                        flatten: false,
                        expand: true,
                        src: ['index.html'],
                        dest: '<%= project.dist%>'
                    },
                    {
                        cwd: '<%= project.bower%>/fontawesome',
                        flatten: false,
                        expand: true,
                        src: ['fonts/**/*.*'],
                        dest: '<%= project.dist%>'
                    }
                ]
            }
        },

        ejs: {
            all: {
                options: {
                },
                src: ['<%= project.app%>/index.ejs'],
                dest: '<%= project.build%>/index.html',
                expand: false,
                ext: '.html',
            },
        },

        compress: {
            main: {
                options: {
                    archive: 'dist.tgz'
                },
                files: [
                    {
                        src: ['<%= project.dist%>/**'],
                        expand: true,
                        dest: '.'
                    }
                ]
            }
        }
    });

    grunt.registerTask('serve', [
        'clean:dev',
        'wiredep',
        'ejs',
        'less',
        'copy',
        'express:dev',
        'open:dev',
        'watch:dev'
    ]);

    grunt.registerTask('prod', [
        'jshint',
        'clean:dist',
        'wiredep',
        'ejs',
        'useminPrepare',
        'concat:generated',
        'less:dev',
        'cssmin',
        'uglify',
        'copy',
        'filerev:js',
        'filerev:css',
        'usemin',
        'compress'
    ]);

    grunt.registerTask('default', ['prod']);
};