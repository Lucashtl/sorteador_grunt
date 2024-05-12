module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },

        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/main.html'],
                tasks: ['replace:dev']
            }

        },

        replace: {
            dev: {
                options: {
                    patterns: [{
                        match: 'ENDERECO_CSS',
                        replacement: './styles/main.css'
                    },
                    {
                        match: 'ENDERECO_JS',
                        replacement: '../src/scripts/main.js'
                    }
                    ],
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/main.html'],
                        dest: 'dev/'
                    },

                ],

            },
            dist: {
                options: {
                    patterns: [{
                        match: 'ENDERECO_CSS',
                        replacement: './styles/main.min.css'
                    },
                    {
                        match: 'ENDERECO_JS',
                        replacement: './scripts/main.min.js'
                    }
                ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/main.html'],
                        dest: 'dist/'
                    }
                ]
            },

        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/main.html': 'src/main.html'
                }
            }
        },
        clean: ['prebuild'],

        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }

    })



    grunt.registerTask('default', ['less:development', 'htmlmin:dist', 'replace:dev', 'watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean','uglify']);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

}