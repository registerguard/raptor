/*global module:false*/

module.exports = function(grunt) {
	
	'use strict';
	
	grunt.initConfig({
		
		pkg : grunt.file.readJSON('package.json'),
		
		/**
		 * Build date and version.
		 *
		 * @see http://tanepiper.com/blog/2012/11/25/building-and-testing-javascript-with-gruntjs/
		 * @see http://blog.stevenlevithan.com/archives/date-time-format
		 */
		
		now : grunt.template.today('yyyy_mm_dd'), // Alternative: yyyymmddhhMMss
		
	/* ############################################################
	   Watch
	   ############################################################ */
		
		/**
		 * Run predefined tasks whenever watched file patterns are added, changed
		 * or deleted.
		 *
		 * $ grunt watch
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-watch
		 */
		
		watch : {
			
			tmpl : {
				
				files : [
					
					'./src/**/*'
					
				],
				
				tasks : ['dev']
				
			}
			
		},
		
	/* ############################################################
	   JS Hint
	   ############################################################ */
		
		/**
		 * Validate files with JSHint.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-jshint
		 * @see http://www.jshint.com/docs/
		 */
		
		jshint : {
			
			options : {
				
				jshintrc : '.jshintrc'
				
			},
			
			init : [
				
				'./Gruntfile.js'
				
			]
			
		},
		
	/* ############################################################
	   Environment
	   ############################################################ */
		
		/**
		 * Grunt task to automate environment configuration for future tasks.
		 *
		 * @see https://github.com/onehealth/grunt-env
		 */
		
		env : {
			
			dev : {
				
				NODE_ENV : 'DEVELOPMENT'
				
			},
			
			pro : {
				
				NODE_ENV : 'PRODUCTION'
				
			}
			
		},
		
	/* ############################################################
	   Clean
	   ############################################################ */
		
		/**
		 * Clean files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-clean
		 */
		
		clean : {
			
			options : {
				
				force : true // Sketchy!
				
			},
			
			dev : {
				
				src : [
					
					'../demo/**/*'
					
				]
				
			},
			
			pro : {
				
				src : [
					
					'../<%= pkg.name %>/**/*',
					'../demo/**/*'
					
				]
				
			}
			
		},
		
	/* ############################################################
	   Uglify
	   ############################################################ */
		
		/**
		 * Minify files with UglifyJS.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-uglify
		 * @see http://lisperator.net/uglifyjs/
		 */
		
		uglify : {
			
			pro : {
				
				files : {
					
					'../<%= pkg.name %>/js/<%= pkg.name %>.min.js' : [
						
						'./src/**/*.js',
						'!./src/includes/**/*.js'
						
					]
					
				}
				
			}
			
		},
		
	/* ############################################################
	   LESS
	   ############################################################ */
		
		/**
		 * Compile LESS files to CSS.
		 *
		 * @see 9+
		 */
		
		less : {
			
			options : {
				
				compress : true
				
			},
			
			dev : {
				
				files : {
					
					'../demo/css/boxes.css'      : './src/less/boxes.less',
					'../demo/css/colors.css'     : './src/less/colors.less',
					'../demo/css/fonts.css'      : './src/less/fonts.less',
					'../demo/css/form.css'       : './src/less/form.less',
					'../demo/css/grid.css'       : './src/less/grid.less',
					'../demo/css/headers.css'    : './src/less/headers.less',
					'../demo/css/buttons.css'    : './src/less/buttons.less',
					'../demo/css/typography.css' : './src/less/typography.less',
					'../demo/css/utilities.css'  : './src/less/utilities.less',
					
					'../demo/css/demo.css' : './src/less/demo.less',
					
					'../demo/css/<%= pkg.name %>.css' : './src/less/_<%= pkg.name %>.less'
					
				}
				
			},
			
			pro : {
				
				options : {
					
					yuicompress : true
					
				},
				
				files : {
					
					'../<%= pkg.name %>/css/<%= pkg.name %>.min.css' : './src/less/_<%= pkg.name %>.less',
					'../demo/css/demo.css' : './src/less/demo.less'
					
				}
				
			}
			
		},
		
		
		
	/* ############################################################
	   Includes
	   ############################################################ */
		
		/**
		 * Include other files, like php `include`.
		 *
		 * @see https://github.com/vanetix/grunt-includes
		 */
		
		includes: {
			
			files: {
				
				src: '*.html',
				dest: '../demo',
				flatten: true,
				cwd: './src/demo/'
				
			}
			
		},
		
	/* ############################################################
	   Pre-process
	   ############################################################ */
		
		/**
		 * Grunt task around preprocess npm module.
		 *
		 * @see https://github.com/onehealth/grunt-preprocess
		 * @see https://github.com/onehealth/preprocess
		 */
		
		preprocess : {
			
			options : {
				
				context : {
					path : '../<%= pkg.name %>',
					name : '<%= pkg.name %>'
				}
				
			},
			
			dev : {
				
				files : {
					
					'../demo/index.html' : '../demo/index.html'
					
				}
				
			},
			
			pro : {
				
				files : {
					
					// './src/buttons/index.html' : './src/buttons/buttons.html', // destination : source
					// '../demo/index.html'       : '../demo/index.html'
					
					'../demo/index.html'   : '../demo/index.html',
					'../demo/buttons.html' : '../demo/buttons.html',
					'../demo/form.html'    : '../demo/form.html',
					'../demo/headers.html' : '../demo/headers.html'
					
				}
				
			}
			
		},
		
	/* ############################################################
	   Copy
	   ############################################################ */
		
		/**
		 * Copy files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-copy
		 * @see http://gruntjs.com/configuring-tasks#globbing-patterns
		 */
		
		copy : {
			
			dev : {
				
				files : [
					
					{
						
						expand : true,
						cwd : './src/',
						src : [
							
							'js/**/*',
							'includes/**/*',
							'img/**/*'
							
						],
						dest : '../demo/'
						
					}
					
				]
				
			},
			
			pro : {
				
				files : [
					
					/*
					{
						
						expand : true,
						cwd : './src/_<% pkg.name %>/',
						src : 'index.html'
						dest : '../demo/'
						
					},
					*/
					
					{
						
						expand : true,
						cwd : '../<%= pkg.name %>/',
						src : [
							
							'css/<%= pkg.name %>.min.css',
							'js/<%= pkg.name %>.min.js'
							
						],
						dest : '../demo/'
						
					},
					
					{
						
						expand : true,
						cwd : './src/',
						src : [
							
							'includes/**/*',
							'img/**/*'
							
						],
						dest : '../demo/'
						
					}
					
				]
				
			}
			
		}
		
	});


/* ############################################################
Tasks
   ############################################################ */
	
	// DEVELOPMENT
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	
	// JS
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	
	// MOVE + CLEAN
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	
	// CSS
	grunt.loadNpmTasks('grunt-contrib-less');
	
	
	// PREPROCESS + INCLUDES
	grunt.loadNpmTasks('grunt-preprocess');
	
	grunt.loadNpmTasks('grunt-includes');
	
	grunt.loadNpmTasks('grunt-env');
	
	//----------------------------------
	
	grunt.registerTask('default', ['jshint']);
	
	grunt.registerTask('dev', ['jshint', 'clean:dev', 'less:dev', 'includes', 'copy:dev', 'env:dev', 'preprocess:dev']);
	
	grunt.registerTask('pro', ['jshint', 'clean:pro', 'uglify:pro', 'less:pro', 'includes', 'copy:pro', 'env:pro', 'preprocess:pro']);
	
};
