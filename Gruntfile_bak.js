module.exports = function(grunt){

	//Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options:{
				separator:';'
			},
			dist:{
				src:['src/**/*.js'],
				dest:'build/built.js'
			}
		},
		filerev:{
            options:{
                length:8
            },
            source:{
                files:[
                    {src:'build/**.min.js'},
                    {src:'<%= grunt.environment %>/css/**.min.css'}
                ]
            }
        },
        useminPrepare:{
        	src:['test.html']
        },
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'grunt_test/js/z*.js',
				dest: 'build/<%= pkg.name %>.min.js'
			},
			dynamic: {
				files : [
					{
						expand: true,
						cwd: 'grunt_test/js/',
						src: ['**/*.js'],
						dest: 'build/',
						ext: '.min.js',
						extDot: 'first'
					}
				]
			},
			test3:{
				
				src:'src/**/*.js',
				dest:'build/test.min.js'
				
			}
		}
	});

	//加载包含"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-usemin');

	//默认被执行的任务列表。
	grunt.registerTask('default',['uglify:build']);

	grunt.registerTask('dynamic',['uglify:dynamic']);

	grunt.registerTask('test1','test1',function(){
		grunt.task.run(['uglify:test3','filerev']);
	});
	grunt.registerTask('test2',['useminPrepare']);

	grunt.registerTask('test','log same stuff',function(){
		grunt.log.write('logging some stuff...').ok();
	});
};