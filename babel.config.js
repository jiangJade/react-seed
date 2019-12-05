module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
    ],
    plugins: [
        ['import', { 
            libraryName: 'antd',
            libraryDirectory: 'lib',
            'style': 'css'
        }],
        ['react-css-modules', {
            'generateScopedName': '[name]_[local]_[hash:base64:5]'
        }],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime'
    ]
};