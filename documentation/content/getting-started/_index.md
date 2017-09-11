+++
title = "Installation"
description = "Your first steps with gluebert.js"
+++

## tl;dr

### installation by package managers


#### via npm

```bash
npm install gluebert --save
```

#### via yarn

```bash
yarn add gluebert
```

### Getting started by examples

```bash
git clone git@github.com:wildhaber/gluebert-getting-started.git
cd gluebert-getting-started
npm install
npm run build
npm run serve
```

## Installation Guide

### Requirements
For a proper installation you should be familiar with package-concepts of npm or yarn and having basic knowledge of webpack. Ideally you already work within a set up Webpack setup.

Gluebert.js relies on the following dependencies.

| Dependency | Reason | Documentation |
| --- | --- | --- |
| Webpack | [Dynamic Imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) for [Lazy Loading](https://webpack.js.org/guides/lazy-loading/) | https://webpack.js.org |
| Babel.js      | Use next generation JavaScript | https://babeljs.io/ |

### Install gluebert.js

#### npm
Install gluebert.js [npm Package](https://www.npmjs.com/package/glueberthttps://www.npmjs.com/package/gluebert)

```bash
npm install gluebert --save
```

#### (or) yarn
Install gluebert.js [yarn package](https://yarn.pm/gluebert)

```bash
yarn add gluebert
```

### Babel configuration
Installation necessary packages:

```bash
npm install babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-stage-0 babel-preset-stage-1 babel-preset-stage-2 babel-preset-stage-3 --save-dev
```

Next we need to create or update a `.babelrc`-File in the root folder with the following configuration:

File: *root/* **.babelrc**
```json
{
    "presets": [
        "es2015",
        "stage-0",
        "stage-1",
        "stage-2",
        "stage-3"
    ],
    "plugins": []
}
```

| Package | Reason | Documentation |
| --- | --- | --- |
| [babel-core](https://www.npmjs.com/package/babel-core) | Babel.js core package | [babeljs.io](https://babeljs.io) |
| [babel-loader](https://www.npmjs.com/package/babel-loader) | Webpack loader for Babel | [github.com/babel/babel-loader](https://github.com/babel/babel-loader) |
| [babel-polyfill](https://www.npmjs.com/package/babel-loader) | Add polyfills for legacy browsers | [babeljs.io/docs/usage/polyfill/](https://babeljs.io/docs/usage/polyfill/)


### Webpack configuration
If you do not have an existing Webpack setup yet. You need to install the following packages:

```bash
npm install webpack css-loader extract-text-webpack-plugin file-loader html-loader --save-dev
```
If you like to use `Sass` as your styling pre-compiler, you can add the following packages:

```bash
npm install node-sass postcss-loader sass-loader --save-dev
```

Next we need to create or update a `webpack.config.js`-File in the root folder with the following configuration:

```javascript
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENTRY_POINTS = {
    // Set your app's entry point 
    app: [
        'babel-polyfill', // polyfills necessary if you want to support not so modern browsers
        './src/app.js', // your app's entry point
    ],
};

module.exports = {
    entry: ENTRY_POINTS,
    module: {
        rules: [
        
            // Enable babel.js
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            
            // Enable multiple template engines
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                },
            },

            // Loader for fonts if you use Webfonts
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader?name=[hash].[ext]',
                },
            },

            // Style-Loader for Sass
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                            },
                            {
                                loader: 'sass-loader',
                            },
                        ],
                    },
                ),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
            ignoreOrder: false,
        }),
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',

        // define output folder
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/',
    },
};
```

| Package | Reason | Documentation |
| --- | --- | --- |
| [wepback](https://www.npmjs.com/package/webpack) | Core Webpack Package | [webpack.js.org](https://webpack.js.org) |
| [css-loader](https://www.npmjs.com/package/css-loader) | loader for your stylesheets | [github.com/webpack-contrib/css-loader](https://github.com/webpack-contrib/css-loader) |
| [extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) | Extract CSS and create separate .css-files | [github.com/webpack-contrib/extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) |
| [file-loader](https://www.npmjs.com/package/file-loader) | Loader for various files like webfonts, images and regular text-files | [github.com/webpack-contrib/file-loader](https://github.com/webpack-contrib/file-loader) |
| [html-loader](https://www.npmjs.com/package/html-loader) | Loader for any html template | [github.com/webpack-contrib/html-loader](https://github.com/webpack-contrib/html-loader) |


### package.json command

To run your initial setup let's add a simple build command to the `package.json`:

```json
"build": "./node_modules/.bin/webpack --config webpack.config.js"
```

The content of your `package.json` should look something like this:

```json
{
  "name": "your-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "./node_modules/.bin/webpack --config webpack.config.js"
  },
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "babel-preset-stage-1": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "babel-preset-stage-3": "^6.24.1",
    "css-loader": "^0.28.7",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^0.11.2",
    "html-loader": "^0.5.1",
    "node-sass": "^4.5.3",
    "postcss-loader": "^2.0.6",
    "sass-loader": "^6.0.6",
    "webpack": "^3.5.6"
  },
  "dependencies": {
    "gluebert": "0.0.9"
  }
}
```

### Sample starter

When you have started with an empty project and followed the steps above you should have have ended up with a structure like:

```text
/root
|-- node_modules/...
|-- .babelrc
|-- package.json
|-- webpack.config.js
```

#### Let's setup the demo

For this step we will create a folder called `src` with 2 empty files called `app.js` and `index.html`. 

```bash
mkdir src
touch src/index.html
touch src/app.js
```

The file structure should now look like this:

```text
/root
|-- node_modules/...
|-- src/
|   |-- app.js
|   |-- index.html
|-- .babelrc
|-- package.json
|-- webpack.config.js
```

Before we run our `build`-script, lets add some content for these files:

in `app.js`, add:
```javascript
console.log('Hello, I am content of app.js');
```

In `index.html` add:
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>gluebert.js starter</title>
</head>
<body>

<h1>Welcome to the index.html</h1>
<p>Yes, we will add some more interesting content very soon.</p>

<script>
    var appElement = document.createElement('script');
    appElement.src = '/app.js';

    var scriptElement = document.createElement('script');

    if('MutationObserver' in window
        && 'content' in document.createElement('template')) {
        document.body.appendChild(appElement);
    } else {
        window.addEventListener('load', function() {
            scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.10/webcomponents-loader.js';
            document.body.appendChild(scriptElement);
        });
    }

    window.addEventListener('WebComponentsReady', function() {
        document.body.appendChild(appElement);
    });
</script>

</body>
</html>
```

In order to serve the content from the `dist`-folder we need to install 2 more packages (totally optional, you could do this by hand as well).

**copy-webpack-plugin** in order to copy the index.html over to the dist-folder.
```bash
npm install copy-webpack-plugin --save-dev
```

Update the `webpack.config.js`-file and add another require on top:
```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');
```
then add the following at the plugins-section (just before or after the `ExtractTextPlugin`):
```javascript
new CopyWebpackPlugin([{
    from: `src/index.html`,
}]),
```

**http-server** to serve the content. (this is optional, but very handy when you need to serve files quickly from any directory)
```bash
npm install http-server -g
```

### Run-it!

Now let's run the basic setup:

```bash
npm run build
```

There should be a new folder created and your project should look like:

```text
/root
|-- node_modules/...
|
|-- dist/
|   |-- app.js
|   |-- index.html
|
|-- src/
|   |-- app.js
|   |-- index.html
|-- .babelrc
|-- package.json
|-- webpack.config.js
```

If there are no errors you can now serve the content using the just installed http-server:

```bash
http-server dist -o
```

Now, open your browser and check what happens when you open [localhost:8080](http://localhost:8080)

Console says `Hello, I am content of app.js`? Then, we're on the right track. Otherwise... please troubleshoot and/or [open an issue](https://github.com/wildhaber/gluebert) so we can help you.

Going to [module definitions](/getting-started/module).