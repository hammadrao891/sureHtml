const {merge} = require('webpack-merge');
const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const common = require('./webpack.common.js');

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = merge(common, {
    mode: 'production',
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
                                tag: 'poster',
                                attribute: 'src',
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
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            esModule: false,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                url: false, sourceMap: true,
                                plugins: [
                                    ['autoprefixer'],
                                    ['cssnano', {
                                        preset: 'default'
                                    }]
                                ],
                                minimize: true,
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
            safelist: {
                greedy: [/^swiper/, /^:/, /^html/, /^has/, /^scroll/, /^simplebar/, /^gm/, /^lg/, /^plyr/, /^ls-/]
            }
        }),
    ],
    // optimization: {
    //     minimizer: [
    //         new ImageMinimizerPlugin({
    //             minimizer: {
    //                 implementation: ImageMinimizerPlugin.squooshMinify,
    //                 options: {
    //                     encodeOptions: {
    //                         mozjpeg: {
    //                             quality: 100,
    //                         },
    //                         webp: {
    //                             lossless: 1,
    //                         },
    //                         avif: {
    //                             cqLevel: 0,
    //                         },
    //                     },
    //                 },
    //             },
    //         }),
    //     ],
    // },
});