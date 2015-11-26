module.exports = function(grunt){

	var dist = 'build';
	//Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		useminPrepare: {
			html:'test.html',
			options: {
				dest: dist
			}
		},
		usemin: {
			html:'test.html',
			options: {
				blockReplacements: {
					js: function(block){
						var src = grunt.filerev.summary[dist+'\\'+block.dest];
						var src2 = src.replace(/\\/g,'/');
						//console.log(src+'---'+src2);
						return '<script src="'+src2+'"></script>';
					}
				}
			}
		},
		filerev: {
			options:{
                length:8
            },
            source:{
                files:[
                    {src:'build/**.min.js'}
                ]
            }
		},
		imagemin: {
			dynamic:{
				options: {
					optimizationLevel: 5
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.{png,jpg,gif}'],
					dest:'build/'
				}]
			}
				
		},
		compress: {
			main: {
				options:{
					archive:'public/test.zip'
				},
				expand:true,
				cwd:'build/',
				src:['**/*'],
				dest:'public/'
			}
		}
		/*,
		replace: {
		  example: {
		    src: ['text/*.txt'],             // source files array (supports minimatch) 
		    dest: 'build/text/',             // destination directory or file 
		    replacements: [{
		      from: 'Red',                   // string replacement 
		      to: 'Blue'
		    }, {
		      from: /(f|F)(o{2,100})/g,      // regex replacement ('Fooo' to 'Mooo') 
		      to: 'M$2'
		    }, {
		      from: 'Foo',
		      to: function (matchedWord) {   // callback replacement 
		        return matchedWord + ' Bar';
		      }
		    }]
		  }
		}*/
	});

	//加载包含"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-compress');

	//默认被执行的任务列表。
	grunt.registerTask('test','just for test',function(){
		grunt.task.run(['useminPrepare','concat:generated','uglify:generated','filerev','usemin']);
	});

	grunt.registerTask('test2',['imagemin']);
	grunt.registerTask('test3',['compress']);

};