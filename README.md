jqGrid Dataview
===============

Proof-of-Concept implementation of jQuery UI Dataview extension which allows jQuery UI Grid to make requests to the server in  jqGrid style.

Options
-------
```javascript
options: {
    //Type of request ("POST" or "GET")
    methodType: "GET",
    //The names of the fields sent to the server in the request
    parametersNames: {
        //The name for the page field
        page: "page",
        //The name for the number of rows field
        rows: "rows",
        //The name for the sorting column field
        sort: "sidx",
        //The name for the sorting order field
        order: "sord",
        //The name for the search indicator field
        search:"_search",
        //The name for the searching filters field
        filter: "filters",
        //The name for the time passed to the request field
        nd: "nd"
    },
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