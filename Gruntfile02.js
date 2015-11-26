module.exports = function(grunt){

	//Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		concat: {
		    generated: {
		      files: [
		        {
		          dest: '.tmp/concat/js/app.js',
		          src: [
		            'src/js/app.js',
		            'src/js/controllers/thing-controller.js',
		            'src/js/models/thing-model.js',
		            'src/js/views/thing-view.js'
		          ]
		        }
		      ]
		    }
		},
		uglify: {
		    generated: {
		      files: [
		        {
		          dest: 'build/js/app.js',
		          src: [ '.tmp/concat/js/app.js' ]
		        }
		      ]
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