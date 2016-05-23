Fetch class
===========
An ES6 wrapper class for simplified fetch API requests.

Example
-------
This example shows you how to extend the fetch class and create an instances with different URL prefixes.

### JavaScript
```javascript
import Fetch from 'fetch-class'

let apis = {
    local:       new Fetch(), // Instance with no prefix
    placeholder: new Fetch('http://jsonplaceholder.typicode.com') // Instance with jsonplaceholder prefix
}

apis.placeholder.get('/posts/', (response) => {
    // Application logic to deal with array of posts from http://jsonplaceholder.com/posts/
})


apis.local.get('/posts/', (response) => {
    // Application logic to deal with array of posts from local server - /posts/
})
```

Parameters
----------
### `baseUrl`
Base URL prefix for all instance requests.

### `defaultOptions`
Default options for all instance requests. Supports all options defined in the [fetch API documentation](https://fetch.spec.whatwg.org/), not listed here.

  - `method`: Request method - GET, POST, PUT, PATCH, DELETE
  - `data`: Data to add to request body or query string, depending on request type
  - `queryParams`: Associative object of properties to add to the query string, regardless of request method
  - `alwaysTriggerCallback`: Trigger the callback, even if request fails
  - `callback`: Callback to trigger when request completes - is provided with the promise, response and what's provided in `extraCallbackParams` option
  - `extraCallbackParams`: Extra parameters to provide to the callback arguments object
  - `headers`: HTTP headers object to set on the request

#### Defaults
```javascript
{
    method:                'GET',
    data:                  {},
    queryParams:           {},
    alwaysTriggerCallback: false,
    callback:              undefined,
    extraCallbackParams:   {},
    headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
    }
}
```

Controls
--------
Public control methods to be accessed on an instance are as follows:

### request
Perform a request with the provided URL and options.

### get
Perform a GET request with the provided URL and options.

### post
Perform a POST request with the provided URL and options.

### put
Perform a PUT request with the provided URL and options.

### patch
Perform a PATCH request with the provided URL and options.

### del
Perform a DELETE request with the provided URL and options.

Events
------
The class triggers the following events:

### request:pre
Triggered before request is sent.
#### Receives
```javascript
{
    url:     url,    // URL to send request to - appended to the instance's base URL
    options: options // Request options
}
```

### request:post
Triggered before request is sent.
#### Receives
```javascript
{
    url:     url,     // URL to send request to - appended to the instance's base URL
    options: options, // Request options
    args:    args     // Callback arguments object
}
```