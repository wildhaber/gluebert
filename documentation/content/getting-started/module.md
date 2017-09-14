+++
title = "Module"
description = "ModuleSignatures"
weight = 40

type = "documentation"
+++

## Modules

A ModuleSignature follows the general understanding of a Module in software architecture:

> Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality. 
> *(Wikipedia)*

### Syntax

```javascript
new ModuleSignature(key, selector)
```

## Parameters

A ModuleSignature takes the follwing parameters:

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| key | key identifier for internal use to identify the module | string | true |
| selector | a css-selector string for [.querySelector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors) | string | false |

### key

A simple unique string within your application identifies your module. You should only use characters within `[A-Za-z0-9-_.]` and avoid spaces and other special chars.

Ideally you can prefix your modules for a better scoping. Like `appname-header` instead of just `header`.

### selector

A selector string that can be used for [.querySelector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors).

Basically, they are selectors as you know from CSS or the good old friend jQuery.

| Selector | Description |
| --- | --- |
| `tag-name` | selects an element by its tag-name e.g. `<tag-name></tag-name>` |
| `#id-selector` | selects an element by its id `<div id='id-selector'></div>` |
| `.css-class` | selects an element by its css class `<span class='css-class'></span>` |
| `[attribute-selector]` | selects an element by its attribute `<span attribute-selector='something'></span>` |

**This list is not complete.** Just gives you an idea, what a selector is :-)

You can also combine them with `>` for direct children or any other available css-selector.

If you like to adress multiple elements with different selectors, combine them with a simple comma `,` like `.css-selector, #and-this-particular-id`.

### Example

```javascript
import { ModuleSignature } from 'gluebert/module';

const EXAMPLE_MODULE = new ModuleSignature(
    `example-module`,
    `.example-module`
)
```

---

## Methods

A gluebert instance exposes the following methods:

| Method | Description |
| --- | --- |
| setSelector | alternative to define a selector string |
| getSelector | get the defined selector |
| setImportController | Set import loader callback to import the matching controller  |
| getImportController | get the defined import controller callback |
| addDependency | adds a [Dependency](/getting-started/dependency-management) for your controller |
| setImportStyles | Set import loader callback to import the matching stylesheet |
| getImportStyles | get the defined import styles callback |
| addElementSignature | adds an [ElementSignature](/getting-started/elements) for your custom elements |
| getElementSignatures | gets a list of registered [ElementSignatures](/getting-started/elements) |

### .setSelector()

This is just an alternative when the selector is not passed as second parameter in the constructor.

Example:

```javascript
import { ModuleSignature } from 'gluebert/module';
const MODULE = new ModuleSignature(`sample-module`);

MODULE.setSelector('.any-selector-see-above');
```

### .getSelector()

Returns the selector string of a module.

### .setImportController()

Takes a callback that resolves the controller with an dynamic import promise (`import()`) as a callback.

**Note: Do not just pass the controller.**

Example:

```javascript
import { ModuleSignature } from 'gluebert/module';
const MODULE = new ModuleSignature(`sample-module`, '.any-selector');

MODULE.setImportController(
    () => import('./sample-module.controller')
        .then((controller) => controller.SampleModuleController)
);
```

### .addDependency()

Add dependencies to your controller and let them automatically inject.

Example:

```javascript
import { ModuleSignature } from 'gluebert/module';

const MODULE = new ModuleSignature(`my-module`, `.c-module`)
    .setImportController(() => import('./my-module.controller').then((controller) => controller.MyModuleController))

    // Add 2 Dependencies and let them inject automatically
    // In your controller you then can use them with this.$anime or this.$localDep
    // we recommend prefixing your dependencies, to avoid naming collitions
    .addDependency('$anime', () => import('animejs'))
    .addDependency('$localDep', () => import('./localdep').then((dep) => dep.MyDependency));
```

### .getImportController()

Returns the callback for controller import.


### .setImportStyles()

Takes a callback that resolves the stylesheets with an dynamic import promise (`import()`) as a callback.

THe given reference in `import()` will be passed through the defined Webpack-Loader, this way you can use the pre-compiler of your choice. In the examples, we use `Sass`.

**Note: Do not just pass the styles here.**

Example:

```javascript
import { ModuleSignature } from 'gluebert/module';
const MODULE = new ModuleSignature(`sample-module`, '.any-selector');

MODULE.setImportStyles(
    () => import('./sample-module.styles.scss')
);
```

### .setImportStyles()

Returns the callback for styles import.


### .addElementSignature()

Takes an ElementSignature - [read more about custom elements](/getting-started/elements) in the getting-started-guide.

Example:

```javascript
import { ModuleSignature } from 'gluebert/module';
import { ElementSignature } from 'gluebert/element';

const CUSTOM_ELEMENT = new ElementSignature('sample.element', () => import('./sample.template.twig'))
const SECOND_ELEMENT = new ElementSignature('sample.second.element', () => import('./sample.second.template.twig'))

const MODULE = new ModuleSignature(`sample-module`, '.any-selector');

MODULE.addElementSignature(CUSTOM_ELEMENT);
MODULE.addElementSignature(SECOND_ELEMENT); // you can add multiple elements :-)
```

### .getElementSignatures()

Returns a list of [ElementSignatures](/getting-started/elements) added.

---


## References and Examples

| What | Where |
| --- | --- |
| [API Reference](https://api.gluebert.com/ModuleSignature.html) | [api.gluebert.com/ModuleSignature.html](https://api.gluebert.com/ModuleSignature.html) |
| [Example Module Folder](https://github.com/wildhaber/gluebert/tree/develop/documentation/themes/gluebert/src/js/modules/lazy-img) | [github.com/wildhaber/gluebert/~/modules/lazy-img](https://github.com/wildhaber/gluebert/tree/develop/documentation/themes/gluebert/src/js/modules/lazy-img) |
| [Example ModuleSignature](https://github.com/wildhaber/gluebert/blob/develop/documentation/themes/gluebert/src/js/modules/lazy-img/lazy-img.module.js) | [github.com/wildhaber/gluebert/~/modules/lazy-img/lazy-img.module.js](https://github.com/wildhaber/gluebert/blob/develop/documentation/themes/gluebert/src/js/modules/lazy-img/lazy-img.module.js) |
