const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () =>{
   const config =  {
        splitChunks: {
        chunks: 'all'
    }}
    if (isProd){
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }
     return config
}
const isDev = process.env.NODE_ENV === 'development';
console.log('isDev:' + isDev);
const isProd = !isDev
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js',
        idea: './js/idea.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
           
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{
                from: './assets/image',
                to: './image'
            }
            
        ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    },
                }, 'css-loader']

            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    },
                }, 'css-loader',
                 'less-loader']

            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    },
                }, 'css-loader',
                 'sass-loader']

            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            }
            
        ],
    },
}