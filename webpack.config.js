const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = '';

module.exports={
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path:path.resolve(__dirname,'./dist'),
        publicPath : publicPath
    },
    mode:'production',
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(ttf|otf|woff|eot)$/,
                exclude:/node_modules/,
                loader:'file-loader',
                options: {
                    context: path.resolve(__dirname, 'src'),
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(svg|png|jpg|gif|ico)$/,
                exclude:/node_modules/,
                loader:'file-loader',
                options: {
                    context: path.resolve(__dirname, 'src'),
                    name: '[path][name].[ext]'
                }
            },
            {
                test:/\.scss$/,
                use:[ 
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                }, 'css-loader', 'sass-loader']               
             
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/env'],
                        plugins:['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'styles.css'            
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
}