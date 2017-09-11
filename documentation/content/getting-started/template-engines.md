+++
title = "Template Engines"
description = "Working with Template Engines"
weight = 7

type = "documentation"
+++

## Template Engines

Templates are used for [custom elements](/getting-started/elements/). The main goal of template engines is, to have a seamless integration into your environment.

So for example, having a Twig template engine for Drupal or Symfony applications or Handlebars, Mustache for any applications.

There are built-in adapters for `Twig`, `Handlebars` and `Mustache`. But you can also create your own adapter.

Template Engines are defined in your [gluebert instance](/getting-started/gluebert).

## Twig Template

### Installation

Since gluebert does not create dependencies for all Template engines, you need to install them in your project separately.

```bash
npm install twig --save-dev
```

### Add to the gluebert instance

```javascript
import { Gluebert } from 'gluebert';
import { TwigTemplate } from 'gluebert/template';

import Twig from 'twig';

const MODULES = [];
const DATA = [];

const TEMPLATE = new TwigTemplate(Twig);

const gluebert = new Gluebert(MODULES, DATA)
    .setTemplateEngine(TEMPLATE)
    .start();
```

### Usage Example

**template.twig**
```twig
<li class="ball {% if (number % 2) == 0 %}even{% else %}odd{% endif %}">
    {{ number }}
</li>
```

in the controller:

```javascript
async _createBallElement(number) {
    const el = await this._elements.create('ball.element', {
        number: number,
    });
    
    if(el) {
        window.requestAnimationFrame(() => {
            document.body.appendChild(el);
        });
    }
    return this;
}
```

## Handlebars

### Installation

```bash
npm install handlebars --save-dev
```

### Add to the gluebert instance

```javascript
import { Gluebert } from 'gluebert';
import { HandlebarsTemplate } from 'gluebert/template';

import Handlebars from 'handlebars';

const MODULES = [];
const DATA = [];

const TEMPLATE = new HandlebarsTemplate(Handlebars);

const gluebert = new Gluebert(MODULES, DATA)
    .setTemplateEngine(TEMPLATE)
    .start();
```

### Usage Example

**template.hbs**
```hbs
<li class="ball {{ evenOddClass }}">
    {{ number }}
</li>
```

in the controller:

```javascript
async _createBallElement(number) {
    const el = await this._elements.create('ball.element', {
        number: number,
        evenOddClass: () => {
            switch (number.number % 2) {
                case 1 :
                    return 'even';
                case 0 :
                    return 'odd';
                default :
                    return 'unknown';
                    break;
            }
        },
    });
    
    if(el) {
        window.requestAnimationFrame(() => {
            document.body.appendChild(el);
        });
    }
    return this;
}
```

## Mustache

### Installation

```bash
npm install mustache --save-dev
```

### Add to the gluebert instance

```javascript
import { Gluebert } from 'gluebert';
import { MustacheTemplate } from 'gluebert/template';

import Mustache from 'mustache';

const MODULES = [];
const DATA = [];

const TEMPLATE = new MustacheTemplate(Mustache);

const gluebert = new Gluebert(MODULES, DATA)
    .setTemplateEngine(TEMPLATE)
    .start();
```

### Usage Example

**template.mustache**
```mustache
<li class="ball {{ evenOddClass }}">
    {{ number }}
</li>
```

in the controller:

```javascript
async _createBallElement(number) {
    const el = await this._elements.create('ball.element', {
        number: number,
        evenOddClass: () => {
            switch (number.number % 2) {
                case 1 :
                    return 'even';
                case 0 :
                    return 'odd';
                default :
                    return 'unknown';
                    break;
            }
        },
    });
    
    if(el) {
        window.requestAnimationFrame(() => {
            document.body.appendChild(el);
        });
    }
    return this;
}
```

## Create your own Template Adapter

Despite of the built in adapters, you can create your own template adapter easily.

For this, lets create a new file called `custom.template.js`:

```bash
touch custom.template.js
```

Open the file and start with the followig self explaining lines:

```javascript
import { TemplateAbstract } from './template.abstract';

class CustomTemplate extends TemplateAbstract {

    constructor(engine) {
        super(engine);
    }

    createView(template) {
        return () => {
            return {
                prettyRaw: (data) => {
                    return JSON.stringify([template, data]);
                },
            }
        };
    }
    
    render(view, data) {
        return view.prettyRaw(data);
    }

}

export {
    CustomTemplate,
};

```

Lets have a look at the constructor first.

There, we register the `engine` in the `TemplateAbstract` which is available later by `this._engine`.

Since this is just an adapter, the actual template engine should be programmed separately and passed in the Template at initialization (see the examples for Twig, Handlebars and Mustache above).

Next, there is a 2-Step process within template engines usually.

Step 1 actually prepares the template-markup and returns a function that can be used to pass data in and converts it to the converted template.

In the second step the actual transformation happens.

---

## References and Examples

| What | Where |
| --- | --- |
| [API Reference](https://api.gluebert.com/TemplateAbstract.html) | [api.gluebert.com/TemplateAbstract.html](https://api.gluebert.com/TemplateAbstract.html) |
| [Twig Adapter](https://github.com/wildhaber/gluebert/blob/develop/src/template/twig.template.js) | [github.com/wildhaber/gluebert/~/template/twig.template.js](https://github.com/wildhaber/gluebert/blob/develop/src/template/twig.template.js) |
| [Handlebars Adapter](https://github.com/wildhaber/gluebert/blob/develop/src/template/handlebars.template.js) | [github.com/wildhaber/gluebert/~/template/handlebars.template.js](https://github.com/wildhaber/gluebert/blob/develop/src/template/handlebars.template.js) |
| [Mustache Adapter](https://github.com/wildhaber/gluebert/blob/develop/src/template/mustache.template.js) | [github.com/wildhaber/gluebert/~/template/mustache.template.js](https://github.com/wildhaber/gluebert/blob/develop/src/template/mustache.template.js) |
| [npm Twig](https://www.npmjs.com/package/twig) | [npmjs.com/package/twig](https://www.npmjs.com/package/twig) |
| [npm Handlebars](https://www.npmjs.com/package/handlebars) | [npmjs.com/package/handlebars](https://www.npmjs.com/package/handlebars) |
| [npm Mustache](https://www.npmjs.com/package/mustache) | [npmjs.com/package/mustache](https://www.npmjs.com/package/mustache) |
