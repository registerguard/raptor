/* jslint es3: false */
/* global module:false */

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
					
					'./files/**/*',
					
				],
				
				tasks : ['dev',],
				
			},
			
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
				
				jshintrc : '.jshintrc',
				
			},
			
			init : [
				
				'./Gruntfile.js',
				
			],
			
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
				
				NODE_ENV : 'DEVELOPMENT',
				
			},
			
			prod : {
				
				NODE_ENV : 'PRODUCTION',
				
			},
			
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
				
				force : true, // Sketchy!
				
			},
			
			dev : {
				
				src : [
					
					'../demo/**/*',
					
				],
				
			},
			
			prod : {
				
				src : [
					
					'../prod/**/*',
					'../demo/**/*',
					
				],
				
			},
			
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
			
			prod : {
				
				files : {
					
					'../prod/js/<%= pkg.name %>.min.js' : [
						
						'./files/**/*.js',
						'!./files/includes/**/*.js',
						
					],
					
				},
				
			},
			
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
				
				compress : true,
				
			},
			
			dev : {
				
				files : {
					
					'../demo/css/boxes.css'      : './files/less/boxes.less',
					'../demo/css/colors.css'     : './files/less/colors.less',
					'../demo/css/fonts.css'      : './files/less/fonts.less',
					'../demo/css/form.css'       : './files/less/form.less',
					'../demo/css/grid.css'       : './files/less/grid.less',
					'../demo/css/headers.css'    : './files/less/headers.less',
					'../demo/css/buttons.css'    : './files/less/buttons.less',
					'../demo/css/typography.css' : './files/less/typography.less',
					'../demo/css/utilities.css'  : './files/less/utilities.less',
					
					'../demo/css/demo.css' : './files/less/demo.less',
					
					'../demo/css/<%= pkg.name %>.css' : './files/less/_<%= pkg.name %>.less',
					
				},
				
			},
			
			prod : {
				
				options : {
					
					yuicompress : true,
					
				},
				
				files : {
					
					'../prod/css/<%= pkg.name %>.min.css' : './files/less/_<%= pkg.name %>.less',
					'../demo/css/demo.css' : './files/less/demo.less',
					
				},
				
			},
			
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
				cwd: './files/demo/',
				
			},
			
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
					name : '<%= pkg.name %>',
				},
				
			},
			
			dev : {
				
				files : {
					
					'../demo/index.html' : '../demo/index.html',
					
				},
				
			},
			
			prod : {
				
				files : {
					
					'../demo/index.html'   : '../demo/index.html',
					'../demo/buttons.html' : '../demo/buttons.html',
					'../demo/forms.html'    : '../demo/forms.html',
					'../demo/headers.html' : '../demo/headers.html',
					
				},
				
			},
			
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
						cwd : './files/',
						src : [
							
							'js/**/*',
							'includes/**/*',
							'img/**/*',
							//'fonts/*.*',
							
						],
						dest : '../demo/',
						
					},
					
				],
				
			},
			
			prod : {
				
				files : [
					
					/*
					{
						
						expand : true,
						cwd : './files/_<% pkg.name %>/',
						src : 'index.html',
						dest : '../demo/',
						
					},
					*/
					
					{
						
						expand : true,
						cwd : '../prod/',
						src : [
							
							'css/<%= pkg.name %>.min.css',
							'js/<%= pkg.name %>.min.js',
							
						],
						dest : '../demo/',
						
					},
					
					{
						
						expand : true,
						cwd : './files/',
						src : [
							
							'includes/**/*',
							'img/**/*',
							//'fonts/*.*',
							
						],
						dest : '../demo/',
						
					},
					
					/*
					{
						
						expand : true,
						cwd : './files/',
						src : [
							
							'fonts/*.*',
							
						],
						dest : '../<%= pkg.name %>/',
						
					},
					*/
					
				],
				
			},
			
		},
		
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
	
	grunt.registerTask('default', ['jshint',]);
	
	grunt.registerTask('dev', ['jshint', 'clean:dev', 'less:dev', 'includes', 'copy:dev', 'env:dev', 'preprocess:dev',]);
	
	grunt.registerTask('prod', ['jshint', 'clean:prod', 'uglify:prod', 'less:prod', 'includes', 'copy:prod', 'env:prod', 'preprocess:prod',]);
	
};
