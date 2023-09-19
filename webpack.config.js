const path = require("path"); // модуль для автоматического определения пути к файлу
const HtmlWebpackPlugin = require('html-webpack-plugin'); // компиляция html файлов
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // компиляция css файлов 
const mode = process.env.NODE_ENV || 'development'; // определяет режим разработки
const devMode = mode === 'development'; // режим разработки dev, тип boolean
const target = devMode ? 'web' : 'browserslist'; // определяет среду разработки
const devtool = devMode ? 'eval-cheap-module-source-map' : undefined;  // source-map - распределение по папкам как в dev

module.exports = {
    mode,
    target,
    devtool,
    devServer: {  // сервер от webpack
        port: 3000, // на каком порту размещен сервер
        open: true, // автоматическое открытие
        hot: devMode, // автоматическое обновление контента без перезагрузки страницы
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.jsx')], // входные файлы для сборки
    output: { // выходные данные для сборки
        path: path.resolve(__dirname, 'dist'), // путь куда следует складывать собранные файлы
        clean: true, // очистка dist от неиспользуемых файлов
        filename: 'index.[contenthash].js', // имя собранного файла
        assetModuleFilename: 'assets/[name][ext]'
    },
    optimization: { // при импорте одной библиотеки в разные файлы не происходит несколько скачиваний одной и той же библиотеки
        splitChunks: {
            chunks: 'all',
        }
    },
    plugins: [ // массив в котором подключаются плагины
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'index.[contenthash].css'
        })
    ],
    module: { 
        rules: [ // правила для подключенных лоадеров
            {
                test: /\.html$/i, // правила для html
                loader: 'html-loader',
            },
            {
                test: /\.(c|sa|sc)ss$/i, 
                use: [ devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('postcss-preset-env')],
                        }
                    }
                },
                'sass-loader',
                ],
            },
            {
                test: /\.woff2?|ttf|eot$/i, // правила для шрифтов
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i, // правила для изображений и настройки
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/i, // правила для js
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
            },
            {
                test: /\.jsx$/i, // правила для react
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-react', { targets: "defaults" }]
                    ]
                  }
                }
            },
        ]
    }
}