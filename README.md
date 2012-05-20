jqGrid Dataview
===============

Proof-of-Concept implementation of jQuery UI Dataview extension which allows jQuery UI Grid to make requests to the server in  jqGrid style.

Options
-------
```javascript
options: {
    //Type of request ("POST" or "GET")
    methodType: "GET",
    //Resource URL
    resource: null,
    //Initial sorting
    sort: [],
    paging: {
        //Page size
        limit: 20,
        //Initial offset
        offset: 0
    },
    //Initial filters
    filter: null
}
```