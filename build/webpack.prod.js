//生成环境配置
const fs = require('fs');
const path = require('path');
function resolve(dir) {
    return path.resolve(__dirname, dir)
}

const join = path.join
function getEntries(path) {
    let files = fs.readdirSync(resolve(path));
    const entries = files.reduce((ret, item) => {
        const itemPath = join(path, item)
        const isDir = fs.statSync(itemPath).isDirectory();
        if (isDir) {
            ret[item] = resolve(join(itemPath, 'index.js'))
        } else {
            const [name] = item.split('.')
            ret[name] = resolve(`${itemPath}`)
        }
        return ret
    }, {})
    return entries
}

module.exports = {
    css: {
        sourceMap: true,
        extract: {
            filename: 'themes/[name].css'
        }
    },
    configureWebpack: {
        entry: {
            ...getEntries(resolve('./../packages')),
        },
        output: {
            filename: '[name].js',
            libraryTarget: 'commonjs2',
        },
        externals: { // 减少打包体积
            // axios: "axios",
            vue: "Vue",
            'vue-router': 'vue-router',
            'element-ui': 'element-ui'
        }
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add('/packages')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
        config.optimization.delete('splitChunks')
        // config.plugins.delete('copy')
        config.plugins.delete('html') // 删除模板插件
        config.plugins.delete('preload') // 删除预加载插件
        config.plugins.delete('prefetch')
        config.plugins.delete('hmr')
        config.entryPoints.delete('app')

        config.module
            .rule('fonts')
            .use('url-loader')
            .tap(option => {
                option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
                return option
            })
        // 基础样式
        config.plugin('copy').tap(args => {
            args[0][0].from = resolve('../src/styles/base.css')
            args[0][0].to = "themes"
            return args;
        })
    },
    outputDir: 'lib',
    productionSourceMap: false,
}
