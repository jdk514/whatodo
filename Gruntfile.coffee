module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON('package.json')
        watch:
            coffeescript:
                files: ['whatodo/frontend/**/*.coffee']
                tasks: ['coffee:compile']
        coffee:
            compile:
                expand: true
                cwd: 'whatodo/frontend/'
                src: ['**/*.coffee']
                dest: 'whatodo/static/js/'
                ext: '.js'



    grunt.loadNpmTasks('grunt-contrib-coffee')
    grunt.loadNpmTasks('grunt-contrib-watch')
