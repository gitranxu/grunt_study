
module.exports = function (grunt) {

    var getUATStaticDomain = function(){
        return 'm' + (parseInt(Math.random()*4) + 1) + '.lenovouat.cn';
    }
    var getProductionStaticDomain = function(){
        return 'm' + (parseInt(Math.random()*4) + 1) + '.lefile.cn';
    }

    var getDevStaticDomain = function(){
        return 'm' + (parseInt(Math.random()*4) + 1) + '.lenovodev.cn';
    }

    var _configfile = grunt.file.read('GRUNTCONFIG.js').replace(/^[^{]+/,'');
    var $GRUNTCONFIG = (new Function('return ' + _configfile))();
    
    var lenovoGruntPojectPath = "gl";
    
    // 构建任务配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'string-replace':[{
                expand:true,
                cwd:'inc/',
                src:'**',
                dest:"inc/",
                options:{
                    replacements:[{
                        pattern:/\$GRUNTCONFIG\.DEV\.([a-zA-Z0-9-_]+)/g,
                        replacement:function($1,$2){
                            var environment = grunt.environment;
                            return $GRUNTCONFIG[environment][$2];
                        }
                    }]
                }
            }, {
                expand:true,
                cwd:'<%= grunt.environment %>/js/',
                src:'**.js',
                dest:"<%= grunt.environment %>/js",
                options:{
                    replacements:[{
                        pattern:/\$GRUNTCONFIG\.DEV\.([a-zA-Z0-9-_]+)/g,
                        replacement:function($1,$2){
                            var environment = grunt.environment;
                            return '"'+ $GRUNTCONFIG[environment][$2] + '"';
                        }
                    }]
                }
            }
        ],
        clean:{
            production:["DEV/**","UAT/**","inc/**"],
            tmp:[".tmp/**"]
        },
        copy: {
            target:{
                files:[{
                        expand: true,
                        cwd: 'src/images/',
                        src: ['**/*.{png,jpg,jpeg,gif}'],
                        dest: '<%= grunt.environment %>/images'
                    }, {
                        expand: true,
                        cwd: 'src/inc/',
                        src: ['**'],
                        dest: 'inc/<%= grunt.environment %>/'
                    }, {
                        expand: true,
                        cwd: 'src/css/icons',
                        src: ['**'],
                        dest: '<%= grunt.environment %>/css/icons'
                    }
                ]
            },
            devtarget:{
                files:[{
                    expand: true,
                    cwd: 'src',
                    src: ['**',"!inc/**"],
                    dest: '<%= grunt.environment %>'
                }, {
                    expand: true,
                    cwd: 'src/inc/',
                    src: ['**'],
                    dest: 'inc/<%= grunt.environment %>/'
                }]
            }
         },
        filerev:{
            options:{
                length:8
            },
            source:{
                files:[
                    {src:'<%= grunt.environment %>/js/**.min.js'},
                    {src:'<%= grunt.environment %>/css/**.min.css'}
                ]
            }
        },
        useminPrepare:{
            src:['src/inc/**.inc'],
            options:{
                dest:'<%= grunt.environment %>'
            }
        },
        usemin:{
            inc:'inc/<%= grunt.environment %>/**.inc',
            js:'<%= grunt.environment %>/js/**.js',
            css:'<%= grunt.environment %>/css/**.css',
            options:{
                blockReplacements:{
                    js:function(block){
                        var environment = grunt.environment;
                        var key = environment + '/' + block.dest;
                        var value =grunt.filerev.summary[key];
                        var rev = value.replace(environment + '/','');
                        var domain = (environment == 'UAT' ? getUATStaticDomain() : (environment == 'PRODUCTION' ? getProductionStaticDomain() : getDevStaticDomain()));


                        return '<script src="http://' + domain +'/'+lenovoGruntPojectPath+'/' + rev + '"></script>';
                    },
                    css:function(block){
                        var environment = grunt.environment;
                        var key = environment + '/' + block.dest;
                        var value =grunt.filerev.summary[key];
                        var rev = value.replace(environment + '/','');
                        var domain = (environment == 'UAT' ? getUATStaticDomain() : (environment == 'PRODUCTION' ? getProductionStaticDomain() : getDevStaticDomain()));
                        return '<link rel="stylesheet" href="http://' + domain +'/'+lenovoGruntPojectPath+'/' + rev + '" />';
                    }
                },
                patterns:{
                    js:[
                       
                        [
                            /(images\/[^\/]+(?:png|jpeg|gif|jpg))/g,
                            '修改JS文件中本地图片的引用地址',
                            function($1){
                                var environment = grunt.environment;
                                var domain = (environment == 'UAT' ? getUATStaticDomain() : (environment == 'PRODUCTION' ? getProductionStaticDomain() : getDevStaticDomain()));

                                return 'http://' + domain +'/'+lenovoGruntPojectPath+'/' + $1;
                            }
                        ],
                        [
                            /(css\/[^\/]+)\.css/g,
                            '修改JS文件中本地css文件的引用地址',
                            function($1){
                                var environment = grunt.environment;
                                //var key = environment + '/' + $1 + '.min.css',value = grunt.filerev.summary[key];

                                var key = environment + '/' + $1 + '.min.css';
                                var value = grunt.filerev.summary[key];

                                if(!value) return $1;
                                var rev = value.replace(environment + '/','').replace('.css','');

                                var domain = (environment == 'UAT' ? getUATStaticDomain() : (environment == 'PRODUCTION' ? getProductionStaticDomain() : getDevStaticDomain()));

                                return 'http://' + domain +'/'+lenovoGruntPojectPath+'/' + rev;
                            }
                        ],
                        [
                            /(js\/[^\/]+)\.js/g,
                            '修改JS文件中本地js文件的引用地址',
                            function($1){
                                var environment = grunt.environment;
                                //var key = environment + '/' + $1 + '.min.js',value = grunt.filerev.summary[key];

                                var key = environment + '/' + $1 + '.min.js';
                                var value =grunt.filerev.summary[key];
                                if(!value) return $1;
                                var rev = value.replace(environment + '/','').replace('.js','');
                                var domain = (environment == 'UAT' ? getUATStaticDomain() : (environment == 'PRODUCTION' ? getProductionStaticDomain() : getDevStaticDomain()));

                                return 'http://' + domain +'/'+lenovoGruntPojectPath+'/' + rev;
                            }
                        ]
                    ],
                    css:[
                        [
                            /(icons\/[^\/]+(?:png|jpeg|gif|jpg))/g,
                            '修改CSS文件中本地图片的引用地址',
                            function($1){
                                var environment = grunt.environment;
                                var domain = (environment == 'UAT' ? getUATStaticDomain() : (environment == 'PRODUCTION' ? getProductionStaticDomain() : getDevStaticDomain()));

                                return 'http://' + domain +'/'+lenovoGruntPojectPath+'/css/' + $1;
                            }
                        ]
                    ]
                }
            }
        }
    });

    grunt.registerTask('production',"生产环境",function(){
        grunt.environment = "PRODUCTION";
        grunt.task.run([
            'clean',
            'copy:target',
            'useminPrepare',
            'concat:generated',
            'cssmin:generated',
            'uglify:generated',
            'filerev',
            'usemin',
            'string-replace',
            'clean:tmp'
        ])
    });
    grunt.registerTask('uat', "uat环境",function(){
        grunt.environment = "UAT";
        grunt.task.run([
            'clean',
            'copy:target',
            'useminPrepare',
            'concat:generated',
            'cssmin:generated',
            'uglify:generated',
            'filerev',
            'usemin',
            'string-replace',
            'clean:tmp'
        ])
    });

    grunt.registerTask('dev', "dev环境",function(){
        grunt.environment = "DEV";
        grunt.task.run([
            'clean',
            'copy:target',
            'useminPrepare',
            'concat:generated',
            'cssmin:generated',
            'uglify:generated',
            'filerev',
            'usemin',
            'string-replace',
            'clean:tmp'
        ])
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');
}