const webpackConfig = require('../node_modules/@ionic/app-scripts/config/webpack.config');
const webpack = require('webpack');

console.log('Editing webpack configuration to inject env');

const nodeEnv = JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development');
const apiUrl = JSON.stringify(process.env.API_URL) || JSON.stringify('');
const platform = JSON.stringify(process.env.PLATFORM) || JSON.stringify('android');

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': nodeEnv,
            'API_URL': apiUrl,
            'PLATFORM': platform
        }
    })
);
