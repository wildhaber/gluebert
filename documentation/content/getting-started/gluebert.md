+++
title = "Gluebert"
description = "new Gluebert() instance"
weight = 30

type = "documentation"
+++

## Gluebert instance

The Gluebert instance central where all the [Module Signatures](/getting-started/module/) and [Data Signatures](/getting-started/data) are stored.
  
Optionally, you can also define a [Template Engine](/getting-started/template-engines) and/or [JSON Schema Validator](/getting-started/elements) for [Cuustom Elements](/getting-started/elements).

### Syntax

```javascript
new Gluebert(ModuleSignatures, DataSignatures, options);
```

## Parameters

Gluebert takes the follwing parameters:

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| [ModuleSignatures](/getting-started/module) | List of ModuleSignatures | Array | false |
| [DataSignatures](/getting-started/data) | List of DataSignatures | Array | false |
| options | object with options | Object | false |

### ModuleSignatures

A list of ModuleSignatures is a simple array. For example:

```javascript
import { Gluebert } from 'gluebert';
import { ModuleSignature } from 'gluebert/module';

// Sample Modules, they actually don't do anything,
// but illustrating how you could list up your module signatures
const MODULES = [
    new ModuleSignature('example-module', '.example-selector'),
    new ModuleSignature('second-module', '.second-module'),
];

const gluebert = new Gluebert(MODULES);
gluebert.start();
```

### DataSignatures

A list of DataSignatures is a simple array. For example:

```javascript
import { Gluebert } from 'gluebert';
import { DataSignature } from 'gluebert/data';

// Sample DataSignatures, they actually don't do anything,
// but illustrating how you could list up your DataSignatures
const DATA = [
    new DataSignature('example-data'),
    new DataSignature('second-data-pool'),
];

const gluebert = new Gluebert([], DATA);
gluebert.start();
```

### options

You can pass in an options object with the following Keys:

| Key | Description | Type | Default |
| --- | --- | --- | --- |
| elementReadyClass | Class that should be added, when element instance has loaded | string | gb-ready |


```javascript
import { Gluebert } from 'gluebert';

const OPTIONS = {
    elementReadyClass: 'element-is-ready',
};

const gluebert = new Gluebert([], [], OPTIONS);
gluebert.start();
```

---

## Methods

A gluebert instance exposes the following methods:

| Name | Description |
| --- | --- |
| setTemplateEngine | Instance of a template engine  |
| setSchemaValidator | Instance of a template engine  |
| start | Start Gluebert |

### .setTemplateEngine()

A [detailed description of template engines](/getting-started/template-engines) you find later in the getting-started-guide.

Example:

```javascript
import { Gluebert } from 'gluebert';
import { TwigTemplate } from 'gluebert/templates'; // adapter for twig template engine
import Twig from 'twig'; // npm install twig --save (separate package)

const gluebert = new Gluebert()
    .setTemplateEngine(new TwigTemplate(Twig));
```

### .setSchemaValidator()

A [detailed description you can find at the Custom Elements-Section](/getting-started/elements) you find later in the getting-started-guide.

If you add a validator, all data passed to create a new element on the fly will be validated and only executed if they match.

Example:

```javascript
import { Gluebert } from 'gluebert';
import ajv from 'ajv'; // npm install ajv --save (separate package)

const gluebert = new Gluebert()
    .setSchemaValidator(ajv);
```

### .start()

With **.start()**, gluebert will run and start observe and bind. This method takes no parameter.

Example:

```javascript
import { Gluebert } from 'gluebert';

const gluebert = new Gluebert()
    .start();
```

---

## References and Examples

| What | Where |
| --- | --- |
| [API Reference](https://api.gluebert.com/Gluebert.html) | [api.gluebert.com/Gluebert.html](https://api.gluebert.com/Gluebert.html) |
| [Example with DynamicImport](https://github.com/wildhaber/gluebert/blob/develop/documentation/themes/gluebert/src/js/app.js) | [github.com/wildhaber/gluebert/~/app.js](https://github.com/wildhaber/gluebert/blob/develop/documentation/themes/gluebert/src/js/app.js) |
| [Example integration with Polyfills](https://github.com/wildhaber/gluebert/blob/develop/documentation/themes/gluebert/layouts/partials/footer.html#L1-L22) | [github.com/wildhaber/gluebert/~/footer.html](https://github.com/wildhaber/gluebert/blob/develop/documentation/themes/gluebert/layouts/partials/footer.html#L1-L22) |
