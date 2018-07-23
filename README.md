![gluebert.js](https://raw.githubusercontent.com/wildhaber/gluebert/master/assets/gluebert_readme.png)

[![CircleCI](https://circleci.com/gh/wildhaber/gluebert/tree/master.svg?style=svg)](https://circleci.com/gh/wildhaber/gluebert/tree/master) 
[![Code Climate](https://codeclimate.com/github/wildhaber/gluebert/badges/gpa.svg)](https://codeclimate.com/github/wildhaber/gluebert)
[![Test Coverage](https://codeclimate.com/github/wildhaber/gluebert/badges/coverage.svg)](https://codeclimate.com/github/wildhaber/gluebert/coverage)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![npm](https://img.shields.io/npm/dm/gluebert.svg?maxAge=2592000)](https://www.npmjs.com/package/gluebert)

# gluebert.js === lazy load *
gluebert.js is a helper lazy loading DOM elements, StyleSheets and JavaScript files using dynamic import and code splitting.

## tl;dr

 - ✂ Code Splitting and dynamic import
 - 🔭 Mutation- and IntersectionObserver
 - 📯 Observable streams by RxJS
 - 🗑 No payload and computation waste
 - 🐲 Legacy Browser Support back to IE11
 - 📚 Here is a [documentation](https://gluebert.com)

![Lazy Loading Concept](https://raw.githubusercontent.com/wildhaber/gluebert/master/assets/lazy-loading-illustration.gif)

### [installation](https://gluebert.com/getting-started/installation) by package managers

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

### Gluebert CLI
Build modules directly from the terminal:

```
npm install gluebert-cli -g
```

See documentation to gluebert-cli here:
https://github.com/wildhaber/gluebert-cli

---

## Get familiar with underlaying concepts

### Webpack's code-splitting and dynamic import
[Webpack](https://webpack.js.org/) is a module bundler that bundles your scripts and assets into one big bundle - or with some configurations it creates little code-chunks working perfectly together.
[Code Splitting](https://webpack.js.org/guides/code-splitting/) and [dynamic import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) are following the best practices for the [HTTP/2-Standard](https://http2.github.io/).

An excerpt of the abstract from HTTP/2:

> This specification describes an optimized expression of the semantics of the Hypertext Transfer Protocol (HTTP), referred to as HTTP version 2 (HTTP/2). HTTP/2 enables a more efficient use of network resources and a reduced perception of latency by introducing header field compression and allowing multiple concurrent exchanges on the same connection. ...

While the dynamic import concept follows a proposal from [tc39](https://github.com/tc39/proposal-dynamic-import) that basically allows importing ressources on runtime by `import()`, which returns a promise. This way you can avoid the high payload, when imports are just at the top of the file like `import { SomeThing} from './some-thing'`, but basically, dynamic imports are a Promise translation of them.

### MutationObserver and IntersectionObserver

[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) are tracking changes in your DOM and lazy binding module signatures and executes them, when an element appears in the viewport using [IntersectionObservers](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

### Observable streams by RxJS

To organize, sending and receiving Data through your application there are observable streams available provided by [RxJS](http://reactivex.io/).

### Related Concepts

| Related Resource | Documentation |
| --- | --- |
| Webpack |  [webpack.js.org](https://webpack.js.org) |
| Webpack Code Splitting | [webpack.js.org/guides/code-splitting/](https://webpack.js.org/guides/code-splitting/) |
| Dynamic Import Proposal by TC39 | [tc39/proposal-dynamic-import](https://github.com/tc39/proposal-dynamic-import) |
| HTTP/2 RFC | [http2.github.io](https://http2.github.io/) |
| MutationObserver | [developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) |
| IntersectionObserver | [developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) |

---

## [Installation](https://gluebert.com/getting-started/installation/) and QuickStart

We recommend following the [installation guide](https://gluebert.com/getting-started/installation/) or if you are in a hurry, 


```bash
git clone git@github.com:wildhaber/gluebert-getting-started.git
cd gluebert-getting-started
npm install
npm run build
npm run serve
```

### [Gluebert instance](https://gluebert.com/getting-started/gluebert)

Starting a gluebert instance can look like this:

```javascript
import { Gluebert } from 'gluebert';

const MODULES = []; // list of module signatures to watch
const DATA = []; // list of data signatures to watch

const gluebert = new Gluebert(MODULES, DATA);

gluebert.start(); // Bootstrap your gluebert application
```

### [Module Signature](https://gluebert.com/getting-started/module/)

A module signature prepares loaders for everything (basically [Controller](https://gluebert.com/getting-started/controller/) and Styles) used for a certain module.

```javascript
// lazy-img.module.js

import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for lazy image loader
 * @type {ModuleSignature}
 */
const LAZY_IMG_MODULE = new ModuleSignature(`lazy-img`, `.c-lazy-img`)

    // Prepared controller that will be imported, as soon as a selector (e.g. '.c-lazy-img') appears
    .setImportController(
        () => import('./lazy-img.controller').then((controller) => controller.LazyImgController)
    )

    // Prepared stylesheets that will be imported, as soon as a certain element appears
    .setImportStyles(() => import('./lazy-img.styles.scss'));

export {
    LAZY_IMG_MODULE,
};
```

### [Module Controller](https://gluebert.com/getting-started/controller/)

A module controller will be instaciated every time an actual element appears in the viewport. For the above example with a lazy loaded image, this could look like:

```javascript
// lazy-img.controller.js

import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents LazyImgController
 * @extends ControllerAbstract
 */
class LazyImgController extends ControllerAbstract {

    /**
     * creates a new LazyImgController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements, dependencies) {
        super(element, data, elements, dependencies);
        
        this._src = (typeof element.dataset.src === 'string')
            ? element.dataset.src
            : null;

        if(this._src) {
            this._lazyLoad();
        }
    }

    _lazyLoad() {
        this._element.setAttribute('src', this._src);
        this._element.addEventListener('load', () => {
            this._element.classList.add('loaded');
        });

        this._element.addEventListener('error', () => {
            this._element.parentNode.removeChild(this._element);
        });
    }

}

export {
    LazyImgController,
};
```

### The styling example

For the sake of completion, following an example of the lazy loaded image. So it will be blurry, while not loaded:

```sass
// lazy-img.styles.scss

.c-lazy-img {

    transition: filter 0.4s;
    will-change: filter;

    &:not(.loaded) {
        filter: blur(10px);
    }
}
```

### Inject the modules in the gluebert instance

Remember, the gluebert instance above had an empty array passed to the gluebert-instance. Let's inject the `lazy-img`-Module.

```javascript
import { Gluebert } from 'gluebert';
import { LAZY_IMG_MODULE } from './modules/lazy-img.module';

const MODULES = [
    LAZY_IMG_MODULE,
];
const DATA = []; // list of data signatures to watch

const gluebert = new Gluebert(MODULES, DATA);

gluebert.start(); // Bootstrap your gluebert application
```

Assume, you have an index.html like:

```html
<html>
    <head>
        <title>Shortcut HTML, just for Example</title>
    </head>
    <body>

        ...a lot of content...

        <img class='c-lazy-img'
            src='/a-really-micro-placeholder-image-with-ultra-low-quality.jpg'
            data-src='/the-one-and-only-lazy-loaded-image.png'>

        ...even more content...

        <script src='/app.js' async></script>
    </body>
</html>
```

And your image will load smoothly and lazy now. All necessary assets like styling and controller in our example will only load and execute, when the user scrolls to the image. Otherwise - no payload or computation except for the minimal signature will happen.

## Cool, isn't it?

### [Prevent FOUC](https://gluebert.com/getting-started/critical-css/)
To avoid a Flash of Unstyled Content (FOUC), there are techniques like the [Critical Path CSS](https://gluebert.com/getting-started/critical-css/).

### [Reduce Network Requests and Offline Support](https://github.com/wildhaber/offline-first-sw)
And to cache the import request, even when a user is offline - read more about [Offline First ServiceWorkers](https://github.com/wildhaber/offline-first-sw).

### This is just the core peak of gluebert.js

Learn more about Topics like:

 - [Gluebert Instance](https://gluebert.com/getting-started/gluebert/)
 - [Module Signatures](https://gluebert.com/getting-started/module/)
 - [Module Controller](https://gluebert.com/getting-started/controller/)
 - [Custom Elements](https://gluebert.com/getting-started/elements/)
 - [Template Engines](https://gluebert.com/getting-started/template-engines/)
 - [Data Management](https://gluebert.com/getting-started/data/)
 - [Data Messages](https://gluebert.com/getting-started/data-messages/)
 
 ## Contribute
 
 Everyone is very welcome to contribute, either reporting `issues` (Bugs, Feature-Requests, Questions etc.) or develop own features, improvements or bugfixes.
 
 For everything you do, assume positive intent behind anything. Don't blame anyone for anything. We are one big family of developers that wants to improve ourselve as well as the way we deal with technologies.
 
 ### Reporting issues
 
 Please be as discriptive as possible, include a brief description of what your topic is about and include as much details as possible so anyone can understand your concern.
 
 Ideal content:
 
  - Description
  - Including Screenshots
  - Providing links to similar examples
  - Add code examples / even pseudo code will help
  - Add environment and browser details if you report bugs
  
### Development

First, create your own fork of this repository and develop within your fork, from there you can make pull requests against the main repostiory.

Documentation, how to fork a repository: https://help.github.com/articles/fork-a-repo/#fork-an-example-repository

```bash
# cloning your fork
git clone git@github.com:<your-github-username>/gluebert.git
```

Create branches for every feature or bugfix and keep separation of concerns, so don't develop 5 different features in one branch. Use a separate branch for every feature.

```bash
# crate a branch like this
git checkout -b feature/<my-initials>-description-of-your-feature
```

Next, do an `npm install` on the root folder. So you have all necessary dependencies installed.

In the main `src/`-folder are all necessary files that runs gluebert. You can run `npm run build` or `npm run build:watch` to generate the necessary files in the dist-folder.

To have an environment ready where everything is prepared, you can explore the content under `documentation`, its the actual website that is rendered from this folder. Running and building the documentation needs to have hugo installed. Hugo is a static site generator that runs with go. You can install it by brew:

```bash
brew install hugo
```

After you have hugo installed, head to `/documentation/themes/gluebert/` and do an `npm install` there. So you have a proper development environment.

There you have the commands like `npm run build:dev`-command to build, or even more convenient `npm run build:watch` watching and rebuilding on changes.

in a separate terminal window you can head to `documentation/` and run `hugo server --watch --disableLiveReload` and you get your server up and running at `http://localhost:1313`.

In a short (expecting you have installed hugo already):

```bash
# install dependencies
# cd gluebert/
npm install
cd documentation/themes/gluebert/
npm install
npm run build:watch

# open a separate terminal window
cd documentation/
hugo server --watch --disableLiveReload
```

It's clearly not a perfect development environment yet. You are more than welcome to give us any feedback :-)

Happy coding, and thanks for any contribution :+1: