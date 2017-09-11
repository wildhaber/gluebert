+++
title = "Data"
description = "Working with Data"
weight = 8

type = "documentation"
+++

## Data

Similar to Modules and Elements, Data are created with a Signature-Typed syntax. This actually allows gluebert to lazy load the data pool until any module is subscribes or pushes data to the data pool.

The data part based on the observer pattern includes RxJS by default.

Similarly to the module controller, you are absolutely free to do what your application needs eg. dealing with server side API's or interacting with client side storage system like localStorage, IndexedDB even opening WebSocket-Clients and spread the data across your application.

### Syntax

```javascript
new DataSignature(key, data)
```

## Parameters

A data signature takes the following parameters:

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| key | unique key identifier for internal use to identify the data | string | true |
| data | import loader callback for your data service using dynamic imports | function | true | 

### Example

```js
/**
 * DataSignature for SomeData
 * @type {DataSignature}
 */
const SOME_DATA_SIGNATURE = new DataSignature(
    'some.data',
    (dataPool) => import('./some.data')
        .then((module) => new module.SomeData(dataPool))
);

export {
    SIGNATURE,
};
```

---

## Data Service

A signature is useless, if you don't have a data service.

Following we show you a minimal data service possible:

```javascript
import { DataAbstract } from 'gluebert/data';

/**
 * Class represents SomeData
 * @extends DataAbstract
 */
class SomeData extends DataAbstract {

    /**
     * create new SomeData instance
     * @param {DataObserver} dataPool
     */
    constructor(dataPool) {
        super(dataPool);
    }

}

export {
    SomeData,
};
```

The AbstractData exposes the following methods and properties you can override when necessary:

### _dataPool
Accessible by `this._dataPool` lets you `subscribe()` or push data by `pushTo` to other data services.

### _observableSubject
An [RxJS `new Subject()`](http://reactivex.io/rxjs/class/es6/Subject.js~Subject.html) accessible by `this._observableSubject` let other modules subscribe or unsubscribe to your data service.

### push(data)
A method accessible by `this.push(data)` triggers the `.next()`-Method of RxJS Subject. This method is executed whenever any participant sends data to your service. Or you can use it to distribute own data to your subscribers.

### getObservable()
A method helper to access data service internal observable. 

---

## References and Examples

| What | Where |
| --- | --- |
| [API Reference](https://api.gluebert.com/DataAbstract.html) | [api.gluebert.com/DataAbstract.html](https://api.gluebert.com/DataAbstract.html) |
| [RxJS](http://reactivex.io/) | [reactivex.io](http://reactivex.io/) |
| [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) | [wikipedia.org/wiki/Observer_pattern](https://en.wikipedia.org/wiki/Observer_pattern) |
