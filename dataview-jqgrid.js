/*
 * jqGrid Dataview
 *
 * Proof-of-Concept implementation of generating jqGrid style requests
 * Copyright © 2012 Tomasz Pêczek
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends on:
 * - jquery.ui.widget.js
 * - jquery.ui.observable.js
 * - jquery.ui.dataview.js
 */
(function ($, undefined) {
    $.widget("ui.jqGridDataview", $.ui.dataview, {
        widgetEventPrefix: "dataview",
        options: {
            methodType: "GET",
            parametersNames: {
                page: "page",
                rows: "rows",
                sort: "sidx",
                order: "sord",
                search:"_search",
                filter: "filters",
                nd: "nd"
            },
            paging: {
                limit: 20
            },
            resource: null,
            source: function (request, response) {
                var data = {
                    request.parametersNames.nd: new Date().getTime(),
                    request.parametersNames.rows: request.paging.limit,
                    request.parametersNames.page: (request.paging.offset / request.paging.limit) + 1
                };

                if (request.sort.length === 1) {
                    if (request.sort[0].slice(0, 1) === "-") {
                        data[request.parametersNames.sort] = request.sort[0].slice(1);
                        data[request.parametersNames.order] = "desc";
                    } else {
                        data[request.parametersNames.sort] = request.sort[0];
                        data[request.parametersNames.order] = "asc";
                    }
                }

                if (request.filter) {
                    var filters = [];
                    $.each(request.filter, function (property, filter) {
                        if (!filter.operator) {
                            filter.operator = isNaN(filter.value) ? "like" : "==";
                        }

                        var operators = {
                            "<": "lt",
                            "<=": "le",
                            ">": "gt",
                            ">=": "ge",
                            "==": "eq",
                            "!=": "ne",
                            "like": "bw"
                        };

                        filters[filters.length] = "{\"field\":\"" + property + "\",\"op\":\"" + operators[filter.operator] + "\",\"data\":\"" + filter.value + "\"}";
                    });

                    data[request.parametersNames.search] = true;
                    data[request.parametersNames.filter] = "{\"groupOp\":\"AND\",\"rules\":[" + filters.join(",") + "]}";
                } else {
                    data[request.parametersNames.search] = false;
                }
                $.ajax({
                    url: request.resource,
                    type: request.methodType,
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        response(data.rows, data.records);
                    }
                });
            }
        }
    });
} (jQuery));
