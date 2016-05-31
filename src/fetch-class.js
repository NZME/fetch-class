import YouAreI from 'youarei'
import EventAbstractClass from 'event-abstract-class'

const OPTIONS = {
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

/**
 * Fetch class
 */
export default class Fetch extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {String} baseUrl        Base URL prefix for all requests
     * @param {Object} defaultOptions Default options for all requests
     */
    constructor (baseUrl = '', defaultOptions = {}) {
        super()

        this.baseUrl        = baseUrl
        this.defaultOptions = Object.assign({}, OPTIONS, defaultOptions)
    }

    // endregion Constructor

    // region Controls

    /**
     * Perform request
     *
     * @param {String}   url      URL to send request to
     * @param {Function} callback Callback function to trigger with response
     * @param {Object}   options  Options to use in fetch request
     */
    request (url, callback, options) {
        let promise,
            uri = new YouAreI(url)

        options        = Object.assign({}, this.defaultOptions, options)
        options.method = options.method.toUpperCase()

        this.trigger('request:pre', {
            url:     url,
            options: options
        })

        uri.query_push(options.queryParams)

        switch (options.method) {
            default:
            case 'GET':
                uri.query_push(options.data)
                break

            case 'POST':
            case 'PATCH':
            case 'PUT':
            case 'DELETE':
                options.body = (options.data instanceof ArrayBuffer)
                    ? options.data
                    : JSON.stringify(options.data)
                break
        }

        fetch(uri.to_string(), options)
            .then((response) => {
                promise = response

                return response.json()
            })
            .then((response) => {
                let args = Object.assign({
                    promise:  promise,
                    response: response,
                    error:    false
                }, options.extraCallbackParams)

                if (callback) {
                    callback(args)
                }

                if (options.callback) {
                    options.callback(args)
                }

                this.trigger('request:post', {
                    url:     url,
                    options: options,
                    args:    args
                })
            })
            .catch((error) => {
                let args = Object.assign({
                    promise:  promise,
                    response: null,
                    error:    error
                }, options.extraCallbackParams)

                console.error(error)

                if (callback) {
                    callback(args)
                }

                if (options.callback && options.alwaysTriggerCallback) {
                    options.callback(args)
                }

                this.trigger('request:post', {
                    url:     url,
                    options: options,
                    args:    args,
                    error:   error
                })
            })
    }

    /**
     * Perform GET request
     *
     * @param {String}   url      URL to send request to
     * @param {Function} callback Callback function to trigger with response
     * @param {Object}   options  Options to use in fetch request
     */
    get (url, callback, options) {
        options = Object.assign({ method: 'get' }, options)

        this.request(`${this.baseUrl}${url}`, callback, options)
    }

    /**
     * Perform POST request
     *
     * @param {String}   url      URL to send request to
     * @param {Function} callback Callback function to trigger with response
     * @param {Object}   options  Options to use in fetch request
     */
    post (url, callback, options) {
        options = Object.assign({ method: 'post' }, options)

        this.request(`${this.baseUrl}${url}`, callback, options)
    }

    /**
     * Perform PUT request
     *
     * @param {String}   url      URL to send request to
     * @param {Function} callback Callback function to trigger with response
     * @param {Object}   options  Options to use in fetch request
     */
    put (url, callback, options) {
        options = Object.assign({ method: 'put' }, options)

        this.request(`${this.baseUrl}${url}`, callback, options)
    }

    /**
     * Perform PATCH request
     *
     * @param {String}   url      URL to send request to
     * @param {Function} callback Callback function to trigger with response
     * @param {Object}   options  Options to use in fetch request
     */
    patch (url, callback, options) {
        options = Object.assign({ method: 'patch' }, options)

        this.request(`${this.baseUrl}${url}`, callback, options)
    }

    /**
     * Perform DELETE request
     *
     * @param {String}   url      URL to send request to
     * @param {Function} callback Callback function to trigger with response
     * @param {Object}   options  Options to use in fetch request
     */
    del (url, callback, options) {
        options = Object.assign({ method: 'delete' }, options)

        this.request(`${this.baseUrl}${url}`, callback, options)
    }

    // endregion Controls
}