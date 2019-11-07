module.exports = {
    parser: require('postcss-scss'),
    plugins: [
        require('postcss-sassy-mixins'),
        require('precss'),
        require('autoprefixer')
    ]
};