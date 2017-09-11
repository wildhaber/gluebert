+++
title = "Elements"
description = "Create Elements on the fly"
weight = 6

type = "documentation"
+++

## Elements

In case you need to register and create custom elements on the fly. Gluebert provides a built in structure that helps you creating them on the fly and loads the necessary dependencies when they are created.

That way, no overhead will be produced for elemenents that may or may not appear.

Basically a custom element has a unique key and a template loader callback. You can use your favourite template engine to make the templates available across the whole application.

For example, use Twig for Symfony, Drupal or whatever you need for your application. Read more in the [Template Engines](/getting-started/template-engines) chapter.

### Syntax

```javascript
new ElementSignature(key, template)
```

## Parameters

An element signature takes the following parameters:

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| key | key identifier for internal use to identify the element | string | true |
| template |  import loader callback for your template using dynamic imports | function | true | 

### Basic Example:

```javascript
import { ElementSignature } from 'gluebert/element';

const COOL_ELEMENT_SIGNATURE = new ElementSignature(
    'mycoolelement',
    () => import('./mycoolelement.template.twig')
);

export {
    COOL_ELEMENT_SIGNATURE,
};
```

This element then needs to be added in the [ModuleSignature](/getting-started/module) in order to become accessible in the [Controller](/getting-started/controller).

---

## Methods

The ElementSignature exposes the following methods:

### .setImportSchema()

Optionally you can define a custon JSON-Schema that validated passed data before the element is being created. You can specify your JSON Schema in the [ModuleSignature](/getting-started/module).

If you need help to create a JSON-Schema, this tool might help you: https://jsonschema.net/#/editor

Example:

```javascript
import { ElementSignature } from 'gluebert/element';

const COOL_ELEMENT_SIGNATURE = new ElementSignature(
    'mycoolelement',
    () => import('./mycoolelement.template.twig')
);

const SCHEMA = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {},
    "id": "http://example.com/example.json",
    "properties": {
    "checked": {
     "default": false,
     "description": "An explanation about the purpose of this instance.",
     "id": "/properties/checked",
     "title": "The Checked Schema",
     "type": "boolean"
    },
    "dimensions": {
     "id": "/properties/dimensions",
     "properties": {
       "height": {
         "default": 10,
         "description": "An explanation about the purpose of this instance.",
         "id": "/properties/dimensions/properties/height",
         "title": "The Height Schema",
         "type": "integer"
       },
       "width": {
         "default": 5,
         "description": "An explanation about the purpose of this instance.",
         "id": "/properties/dimensions/properties/width",
         "title": "The Width Schema",
         "type": "integer"
       }
     },
     "type": "object"
    },
    "id": {
     "default": 1,
     "description": "An explanation about the purpose of this instance.",
     "id": "/properties/id",
     "title": "The Id Schema",
     "type": "integer"
    },
    "name": {
     "default": "A green door",
     "description": "An explanation about the purpose of this instance.",
     "id": "/properties/name",
     "title": "The Name Schema",
     "type": "string"
    },
    "price": {
     "default": 12.5,
     "description": "An explanation about the purpose of this instance.",
     "id": "/properties/price",
     "title": "The Price Schema",
     "type": "number"
    },
    "tags": {
     "id": "/properties/tags",
     "items": {
       "default": "home",
       "description": "An explanation about the purpose of this instance.",
       "id": "/properties/tags/items",
       "title": "The Empty Schema",
       "type": "string"
     },
     "type": "array"
    }
    },
    "type": "object"
};

// JSON Schemas can be large, its recommended to have
// them in a separate file and import them here

COOL_ELEMENT_SIGNATURE.setImportSchema(SCHEMA);

export {
    COOL_ELEMENT_SIGNATURE,
};
```

### .getImportSchema()

Returns the defined JSON Schema.

### .setImportTemplate()

Alternative to define template import if you dont want to do this in the constructor.

Example:

```javascript
import { ElementSignature } from 'gluebert/element';

const COOL_ELEMENT_SIGNATURE = new ElementSignature('mycoolelement')
    .setImportTemplate(
        () => import('./mycoolelement.template.twig')
    );

export {
    COOL_ELEMENT_SIGNATURE,
};
```

### .getImportTemplate()

Returns template import callback.

### .setImportElement()

Optionally you can pass in a controller like class that will be passed before an element is created so you can manipulate or bind the given data to the element as you need to.

This is not necessary, if you have specified a [Template Engine](/getting-started/template-engines).

Example:

```javascript
import { ElementSignature } from 'gluebert/element';

const COOL_ELEMENT_SIGNATURE = new ElementSignature('mycoolelement',  () => import('./mycoolelement.template.html'))
    .setImportElement(
       () => import('./mycoolelement.element').then((module) => module.MyCoolElement)
    );

export {
    COOL_ELEMENT_SIGNATURE,
};
```
In order to have a better overview, we have added an example Template and the appropriate `mycoolelement.element.js`.

**mycoolelement.template.html**
```html
<li class="ball">
    <slot name="number">number</slot>
</li>
```

**mycoolelement.element.js**
```javascript
import { ElementAbstract } from 'gluebert/element';

/**
 * Class represents BallElement
 * @extends ElementAbstract
 */
class BallElement extends ElementAbstract {

    /**
     * Create new BallElement
     * @param {object} data
     * @param {HTMLElement} template - shadow dom template reference
     */
    constructor(data, template) {
        super(data, template);

        this._numberElement = (this._template) ? this._template.querySelector('slot') : null;
        this._ballElement = (this._template) ? this._template.querySelector('.ball') : null;
        this._number = this._data.number;

    }

    /**
     * binds data to element context
     */
    bindData() {
        if(this._numberElement) {
            this._numberElement.textContent = this._number;
        }

        if(this._ballElement) {
            if(this._number % 2 === 0) {
                this._ballElement.classList.add('even');
            } else {
                this._ballElement.classList.add('odd');
            }
        }
    }

}

export {
    BallElement,
};
```

In any controller you then can generate this `mycoolelement` like this:

```javascript
//... assume you are in a controller
async _createCoolElement(number) {
    const el = await this._elements.create('mycoolelement', {
        number: 45,
    });

    // el = HTMLElement(<li class='ball odd'><slot name='number'>45</slot></li>)

    if(el) {
        window.requestAnimationFrame(() => {
            this._ballsListElement.appendChild(el);
        });
    }

    return this;
}
//... end assumption :-)
```

You can find a full example here: https://github.com/wildhaber/gluebert/blob/develop/documentation/themes/gluebert/src/js/modules/ball-bucket/ball-bucket.controller.js#L89-L111

### .getImportElement()

Returns the defined import element callback.

---

## References and Examples

| What | Where |
| --- | --- |
| [API Reference](https://api.gluebert.com/ElementSignature.html) | [api.gluebert.com/ElementSignature.html](https://api.gluebert.com/ElementSignature.html) |
| [Example Element Module Folder](https://github.com/wildhaber/gluebert/tree/develop/documentation/themes/gluebert/src/js/modules/ball) | [github.com/wildhaber/gluebert/~/modules/ball](https://github.com/wildhaber/gluebert/tree/develop/documentation/themes/gluebert/src/js/modules/ball) |
| [Example JSON Schema Integration](https://github.com/wildhaber/gluebert/blob/develop/e2e/src/balls/src/app.js#L8) | [github.com/wildhaber/gluebert/~/src/app.js](https://github.com/wildhaber/gluebert/blob/develop/e2e/src/balls/src/app.js#L8) |
