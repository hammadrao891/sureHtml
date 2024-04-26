const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
        runtimeChunk: 'single'
    },
    output: {
        pathinfo: false,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: {
                        list: [
                            {
                                attribute: 'data-img',
                                type: 'src',
                                filter: (tag, attribute, attributes, resourcePath) => {
                                    // choose all HTML tags except img tag
                                    return tag.toLowerCase() !== 'img';
                                },
                            },
                            {
                                tag: 'img',
                                attribute: 'data-src',
                                type: 'src',
                            },
                            {
                                tag: 'img',
                                attribute: 'data-lowsrc',
                                type: 'src',
                            },
                            {
                                tag: 'img',
                                attribute: 'data-srcset',
                                type: 'srcset',
                            },
                            {
                                tag: 'img',
                                attribute: 'src',
                                type: 'src',
                            },
                            {
                                tag: 'img',
                                attribute: 'srcset',
                                type: 'srcset',
                            },
                            {
                                tag: 'source',
                                attribute: 'src',
                                type: 'src',
                            },
                            {
                                tag: 'video',
                                attribute: 'poster',
                                type: 'src',
                            },
                            {
                                tag: 'div',
                                attribute: 'data-animation-json',
                                type: 'src',
                            },
                            {
                                tag: 'link',
                                attribute: 'href',
                                type: 'src',
                            },
                        ],
                    },
                },
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(mp4|webm)$/,
                type: 'asset/resource',
            }
        ],
    },
});