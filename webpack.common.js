const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// We need Nodes fs module to read directory contents
const fs = require('fs');

function normalizeName(name) {
    return name.replace(/node_modules/g, "nodemodules").replace(/[\-_.|]+/g, " ")
        .replace(/\b(vendors|nodemodules|js|modules|es)\b/g, "")
        .trim().replace(/ +/g, "-");
}

function generateHtmlPlugins(templateDir) {
    const files = [];

    function readDirectory(dir) {
        const directoryContents = fs.readdirSync(path.resolve(__dirname, dir), {withFileTypes: true});

        directoryContents.forEach((dirent) => {
            if (dirent.isDirectory()) {
                readDirectory(`${dir}/${dirent.name}`);
            } else if (dirent.isFile() && path.extname(dirent.name).toLowerCase() === '.html') {
                const name = path.basename(dirent.name, '.html');
                const plugin = new HtmlWebpackPlugin({
                    filename: `${name}.html`,
                    template: path.resolve(__dirname, `${dir}/${name}.html`),
                    minify: false,
                    chunks: ['global', dir.split('/').pop(), name],
                });
                files.push(plugin);
            }
        });
    }

    readDirectory(templateDir);

    return files;
}

// We will call the function like this:
const htmlFiles = generateHtmlPlugins('./src/html/views');

module.exports = {
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            img: path.resolve(__dirname, './src/img'),
            fonts: path.resolve(__dirname, './src/fonts'),
        },
    },
    entry: {
        'global': {
            import: './src/js/global.js'
        },
        // Pages
        'index' : {
            import: './src/js/pages/home.js',
            dependOn: 'global'
        },
        'about' : {
            import: './src/js/pages/about.js',
            dependOn: 'global'
        },
        'leadership' : {
            import: './src/js/pages/leadership.js',
            dependOn: 'global'
        },
        'teams' : {
            import: './src/js/pages/teams.js',
            dependOn: 'global'
        },
        'enterprise' : {
            import: './src/js/pages/enterprise.js',
            dependOn: 'global'
        },
        'partners' : {
            import: './src/js/pages/partners.js',
            dependOn: 'global'
        },
        'contact' : {
            import: './src/js/pages/contact.js',
            dependOn: 'global'
        },
        'get-started' : {
            import: './src/js/pages/get-started.js',
            dependOn: 'global'
        },
        'support' : {
            import: './src/js/pages/support.js',
            dependOn: 'global'
        },
        'feedback' : {
            import: './src/js/pages/feedback.js',
            dependOn: 'global'
        },
        'privacy' : {
            import: './src/js/pages/privacy.js',
            dependOn: 'global'
        },
        'difference' : {
            import: './src/js/pages/difference.js',
            dependOn: 'global'
        },
        'trust-center' : {
            import: './src/js/pages/trust-center.js',
            dependOn: 'global'
        },
        'book-a-demo' : {
            import: './src/js/pages/book-a-demo.js',
            dependOn: 'global'
        },
        'pricing' : {
            import: './src/js/pages/pricing.js',
            dependOn: 'global'
        }
    },
    optimization: {
        chunkIds: 'named',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module.identifier().split("/").reduceRight((item) => item);
                        // const allChunksNames = chunks.map((item) => item.name).join("-");
                        return 'vendors/' + normalizeName(moduleFileName.replace(/[\/]/g, "-"));
                    }
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        ...htmlFiles
    ],
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split('/')
                .slice(1)
                .join('/');
            return `${filepath}/[name][ext]`;
        },
    },
};