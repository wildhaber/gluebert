+++
title = "Data Messages"
description = "Sending and receiving data messages"
weight = 90

type = "documentation"
+++

## Data Messages

Messages are used to send data across your application in a uniformed way.

### Syntax

```javascript
new Message(action, data)
```

## Parameters

A message takes the following parameters:

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| action | a string determines which action or topic should be triggered | string | true |
| data | an object with your data | object | true | 

### Example

```js
import { Message } from 'gluebert/message'

const createSomethingMessage = new Message(
    'add',
    {
        some : 'thing',
    },
),
```

## References and Examples

| What | Where |
| --- | --- |
| [API Reference](https://api.gluebert.com/Message.html) | [api.gluebert.com/Message.html](https://api.gluebert.com/Message.html) |