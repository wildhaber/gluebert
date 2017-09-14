+++
title = "Dependencies"
description = "Dependeny injection with gluebert"
weight = 41

type = "documentation"
+++

## Dependency Management with Gluebert

From time to time your controllers needs some external or internal dependencies. For example if you create a slider and want to use the famous and well stable `nouislider`-package.

Instead of getting a mess or bloat your controllers with dependencies, you can use the `.addDependency`-Method in the [Module Signatures](/getting-started/module/).

Lets go through the mentioned slider example from above.

### ModuleSignature

The module signature could look something like this:

```javascript
import { ModuleSignature } from 'gluebert/module';

const SLIDER_MODULE = new ModuleSignature(`slider`, `.c-slider`)
    .setImportController(() => import('./slider.controller').then((controller) => controller.SliderController))

    // Aasumed we have installed nouislider by npm we can simply
    // define a dependency like this:
    .addDependency('$nouislider', () => import('nouislider'));

    // Syntax:
    // .addDependency(key, importLoader)
    // 
    // key {string} will be the property available within the controller
    // in this example we can access using this.$nouislider
    // 
    // importLoader {function} a regular asynchronous dynamic import of your module


export {
    SLIDER_MODULE,
}    
```

### Controller

The example controller:

```javascript
import { ControllerAbstract } from 'gluebert/controller';

class SliderController extends ControllerAbstract {

    constructor(element = null, data, elements, dependencies) {
        super(element, data, elements, dependencies);
        
        // this.$nouislider became
        // accessible by dependency injection
        this.$nouislider.create(element, {
        	start: [20, 80],
        	connect: true,
        	range: {
        		'min': 0,
        		'max': 100
        	}
        });

    }

}

export {
    SliderController,
};
```

