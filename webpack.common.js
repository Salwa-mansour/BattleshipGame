const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  
    entry:{
     main:path.resolve(__dirname,'./src/main.js'),

    },
    output:{
        filename: '[name].bundle.js',
        path:path.resolve(__dirname,'dist'),
        clean:true,
    },
   
    module:{
        
        rules:[
          {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                targets: "defaults",
                presets: [
                  ['@babel/preset-env']
                ]
              }
            }
          },
            {
                test:/\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,                  
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                          postcssOptions: {
                            plugins: [
                              [
                                "autoprefixer",
                                {
                                  // Options
                                },
                              ],
                            ],
                          },
                        },
                      },
               
                ],
            },
            {

              test: /\.(png|svg|jpg|jpeg|gif)$/i,
      
              type: 'asset/resource',
              
      
            },
        ],
    },
  
      optimization: {
        runtimeChunk: 'single',
      },
    plugins:[
      new HtmlWebpackPlugin({
        title:'to Do App',
        template:path.resolve(__dirname,'./src/index.html'),
      }),
      new MiniCssExtractPlugin()
    ]
};