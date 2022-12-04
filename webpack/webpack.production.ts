import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import merge from 'webpack-merge'
import common from './webpack.common'

const ENV_FILE = dotenv.config({ path: '.env.production' })
if (ENV_FILE.error) {
    throw ENV_FILE.error
}
const ENV = JSON.stringify(ENV_FILE.parsed)

const production: webpack.Configuration = merge(common, {
    mode: 'production',
    entry: ['@babel/polyfill', './src/index.tsx'],
    // devtool: "source-map",
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // name: 'vendors',
                    chunks: 'all',
                    name: (module: { context: string }) => {
                        if (module.context.match(/[\\/]node_modules[\\/]((react).*)[\\/]/)) return 'react'
                        if (module.context.match(/[\\/]node_modules[\\/]((antd).*)[\\/]/)) return 'antd'
                        if (module.context.match(/[\\/]node_modules[\\/]((core).*)[\\/]/)) return 'core'
                        if (module.context.match(/[\\/]node_modules[\\/]((redux-tookit).*)[\\/]/)) return 'redux-tookit'
                        if (module.context.match(/[\\/]node_modules[\\/]((@ckeditor).*)[\\/]/)) return 'ckeditor'

                        return 'vendors'
                    }
                }
            }
        },
        runtimeChunk: { name: 'manifest' }
    },
    plugins: [
        new BundleAnalyzerPlugin() as any,
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public', 'index.html'),
            filename: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),
        new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': ENV
        })
    ]
})

export default production
