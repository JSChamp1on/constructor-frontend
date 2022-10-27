const fs = require('fs');
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const jsonImporter = require("node-sass-json-importer");

const NAME              = process.env.npm_package_name;
const VERSION           = process.env.npm_package_version;
const MAIN              = process.env.npm_package_bin_entry;
const NODE_ENV          = process.env.NODE_ENV;
const API_LINK          = process.env.API_LINK;
const BASE_PATH         = process.env.BASE_PATH || "/";
const _RUNTIME          = "runtime";
const NPM               = "npm";
const SERVICE           = "service";
const DEVELOPMENT       = "development";

module.exports = {
    devtool: "source-map",
    entry: {
        [NAME]: path.join(__dirname, `../${MAIN}`),
    },
    output: {
        filename(e) {
            switch (e.chunk.name) {
                case _RUNTIME: return "static/[name].[hash].js";
                case NPM: return "static/bundle-[name].[contenthash].js";
                case SERVICE: return "static/[name].[hash].js";
                case NAME: return "static/bundle-[name].[hash].js";
                default: return "static/other.[hash].js";
            }
        },
        path: path.join(__dirname, "../build"),
        publicPath: BASE_PATH,
        assetModuleFilename: "assets/[hash][ext]",
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            name(module) {
                return NPM;
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.s?(c|a)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: (
                                    NODE_ENV === DEVELOPMENT
                                        ? "style-[path]-[local]-[hash]"
                                        : "[hash]"
                                ),
                            },
                            url: true,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                importer: jsonImporter(),
                            },
                        }
                    },
                ],
            },
            {
                test: /node_modules\/.+\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[hash][ext]",
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name].[hash][ext]",
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `static/bundle-[name].[contenthash].css`,
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.svg",
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
            "process.env.API_LINK": JSON.stringify(API_LINK),
            "process.env.BASE_PATH": JSON.stringify(BASE_PATH),
            "process.env.VERSION": JSON.stringify(VERSION),
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["node_modules"],
        alias: {
            "@app": path.join(__dirname, "../src/app"),
            "@assets": path.join(__dirname, "../src/assets"),
            "@images": path.join(__dirname, "../src/assets/images"),
            "@moks": path.join(__dirname, "../src/moks"),
            "@pages": path.join(__dirname, "../src/pages"),
            "@redux": path.join(__dirname, "../src/redux"),
            "@components": path.join(__dirname, "../src/components"),
            "@containers": path.join(__dirname, "../src/containers"),
            "@forms": path.join(__dirname, "../src/forms"),
            "@helpers": path.join(__dirname, "../src/helpers"),
            "@hooks": path.join(__dirname, "../src/hooks"),
            "@styles": path.join(__dirname, "../src/styles"),
            "@public": path.join(__dirname, "../public"),
        },
    },
    devServer: {
        http2: true,
        https: {
            key: fs.readFileSync(path.join(__dirname, "../certs/ca.key")),
            cert: fs.readFileSync(path.join(__dirname, "../certs/ca.crt")),
        },
        allowedHosts: [
            "constructor.local",
        ],
        static: {
            directory: path.join(__dirname, "../dist"),
        },
        compress: false,
        port: 2999,
        historyApiFallback: true,
    },
};
