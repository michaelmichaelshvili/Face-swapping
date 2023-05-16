const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "ts-loader",
                }]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]--[hash:base64:5]'
                            }
                        }
                    },
                    { loader: "less-loader" },
                ],
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
    devServer: {
        port: 3000, // you can change the port
    }
}