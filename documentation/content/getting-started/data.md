+++
title = "Data"
description = "Working with Data"
weight = 80

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
    () => import('./balls.data').then((data) => data.BallsData)
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

## Subscribe to a data service

Any controller or data service can subscribe to any data service via [`DataObserver` instance]() created in the gluebert main instance.

In a module controller this happens as follows:

### Syntax

```javascript
// within a controller context
this._data.subscribe(origin, to, next, error, complete, filter = null)
```

### Parameters

A data.subscribe takes the following parameters:

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| origin | unique object from where you are subscribing - usually just pass `this` context | object or instance | true |
| to | key of the data service you want to subscribe (defined in the DataSignature) | string | true | 
| next | function that will be executed when a new message appears or an object with properties that maches a certain action | function or object | true | 
| error | function that will be executed when an error occurs | function | true | 
| complete | function that will be executed when the stream is complete and no new messages will come - usually you unsubscribe at this moment | function | true | 
| filter | a global filter for any message no matter which action | function | false | 

### next as object

If the third argument `next` is defined as an object, you need to define it in the following structure:

```javascript
const next = {

    // method will be executed when a message with the action `actionName` is sent
    actionName: (message) => console.log(message),
    
    // method will be executed when a message with the action `filteredAction` is sent
    // and the `number` property is higher than 10
    filteredAction: {
        fn: (message) => console.log('Only fired when number > 10: '+message.number),
        filter: (message) => message.number > 10,
    }
}
``` 

### filter argument

The `filter` argument expects `null` - unfiltered - or a function that determines which messages are taken at all for this observable.

```javascript
const globalFilter = (message) => (
    typeof message.number === 'number' &&
    !isNaN(message.number)
);
// In that way you only allow messages with a data property number
// that is an actual number and ignore all others
```

### Example

```javascript
// within a controller context
this._data.subscribe(
    this, // context of the subscriber
    'some.data', // key of the data
    (message) => console.log(message.number), // log every message's number property
    this._onError.bind(this), // note: bind() this context
    () => { this._data.unsubscribe(this) }, // unsubscribe when complete
    (message) => (
        typeof message.number === 'number' &&
        !isNaN(message.number)
    ), // only allow messages that have a valid number property
);
```

---

## Unsubscribe from a data service

Please do not forget to unsubscribe from a certain data service when you do not need them anymore. For example, if the element has been deleted or do not send any data anymore (completed).

### Syntax

```javascript
// within a controller context
this._data.unsubscribe(origin, from);
```

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| origin | context - usually `this` | object or instance | true |
| from | optional key of the data service you want to unsubscribe - you can leave that blank and unsubscribe from all data services | string | false | 

---

## Push a message

Any controller or data service can push data to a data service, nevertheless they have an actual subscription or not.

Although you can push any data, we recommend to use the [Message Object](/getting-started/data-message).

### Syntax

```javascript
// within a controller context
this._data.pushTo(key, message);
```

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| key | key of the data service you want to push your data | string | true | 
| message | a message object | Message | true |

### Example

```javascript
// within controller context
this._data.pushTo(
    'some.data',
    new Message('actionName', {
        number: 42,
    }),
);
```


---

## References and Examples

| What | Where |
| --- | --- |
| [API Reference (Data Abstract)](https://api.gluebert.com/DataAbstract.html) | [api.gluebert.com/DataAbstract.html](https://api.gluebert.com/DataAbstract.html) |
| [API Reference (DataObserver)](https://api.gluebert.com/DataObserver.html) | [api.gluebert.com/DataObserver.html](https://api.gluebert.com/DataObserver.html) |
| [RxJS](http://reactivex.io/) | [reactivex.io](http://reactivex.io/) |
| [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) | [wikipedia.org/wiki/Observer_pattern](https://en.wikipedia.org/wiki/Observer_pattern) |
