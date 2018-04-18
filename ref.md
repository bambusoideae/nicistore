References
==========
+ https://github.com/react-boilerplate/react-boilerplate
+ https://www.styled-components.com/
+ https://m.alphasights.com/css-evolution-from-css-sass-bem-css-modules-to-styled-components-d4c1da3a659b

+ Shoping cart example  (saga): https://github.com/redux-saga/redux-saga-devtools/blob/master/examples/shopping-cart/sagas/index.js

+ React components: https://github.com/brillout/awesome-react-components

+ https://reacttraining.com/react-router/web/guides/redux-integration

+ Use immutable-js for store: https://facebook.github.io/immutable-js/

+ ReactionCommerce: https://github.com/reactioncommerce/reaction/tree/master/imports/plugins/core/ui/client

+ React Optimize: https://reactjs.org/docs/optimizing-performance.html

+ Pass params to event handlers: https://reactjs.org/docs/faq-functions.html

+ Redux Async Action: https://redux.js.org/docs/advanced/AsyncActions.html
+ Redux sample: https://codesandbox.io/s/github/reactjs/redux/tree/master/examples/real-world
+ Redux sample: https://redux.js.org/docs/introduction/Examples.html#real-world

Store design
============

Rules
-----

+ components/ (Shared components) - Just plain components must not connect to redux
+ screens/ - End user page - may connect to redux


State Shape
-----------

```js
{
  isFetching: false, // Loading
  didInvalidate: false, // Stale state
  lastUpdated: new Date(), // Last updated
  items: []
}
```

Action
------

https://www.reddit.com/r/reactjs/comments/4lu9hp/patterns_in_reduxsaga_for_action_names/

Flux Standard Action: https://github.com/acdlite/flux-standard-action
## Example

A basic Flux Standard Action:

```js
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}
```

An FSA that represents an error, analogous to a rejected Promise:

```js
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
```

## Actions

An action MUST

- be a plain JavaScript object.
- have a `type` property.

An action MAY

- have an `error` property.
- have a `payload` property.
- have a `meta` property.

An action MUST NOT include properties other than `type`, `payload`, `error`, and `meta`.

### `type`

The `type` of an action identifies to the consumer the nature of the action that has occurred. `type` is a string constant. If two types are the same, they MUST be strictly equivalent (using `===`).

### `payload`

The optional `payload` property MAY be any type of value. It represents the payload of the action. Any information about the action that is not the `type` or status of the action should be part of the `payload` field.

By convention, if `error` is `true`, the `payload` SHOULD be an error object. This is akin to rejecting a promise with an error object.

### `error`

The optional `error` property MAY be set to `true` if the action represents an error.

An action whose `error` is true is analogous to a rejected Promise. By convention, the `payload` SHOULD be an error object.

If `error` has any other value besides `true`, including `undefined` and `null`, the action MUST NOT be interpreted as an error.

### `meta`

The optional `meta` property MAY be any type of value. It is intended for any extra information that is not part of the payload.



Eslint config
=============

Planning
```json
"eslintConfig": {
  "plugins": [
    "redux-saga",
    "react",
    "jsx-a11y"
  ],
    "redux-saga/no-yield-in-race": 2,
    "redux-saga/yield-effects": 2,
  },
}
```

Consider remove rules:
```json
  // Package update reconfig
  "react/no-typos": 0,
  "function-paren-newline": 0,
  "object-curly-newline": 0,
  "prefer-destructuring": 0,
  "prefer-promise-reject-errors": 0
```

Add Rules: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md


CSS
================
+ BEM http://getbem.com/introduction/

+ Inline vs CSS: https://www.ctheu.com/2015/08/17/react-inline-styles-vs-css-stupid-benchmark/

+ http://jsperf.com/inline-style-vs-css-class/2

VS Code
================

+ https://github.com/Microsoft/vscode-tips-and-tricks

Find & Replace
--------------
+ Double quote to single quote RegEx mode: "([^"]+)" -> '$1'
+ Somethings else ...

React router
------------
- https://reacttraining.com/react-router/web/api/history

```javascript
AdminProductsEdit.defaultProps = {
  onLoadProduct: () => {},
  match: undefined, // react-router
  localtion: undefined, // react-router
  history: undefined, // react-router
  product: undefined,
  error: undefined,
  loading: undefined,
  categories: undefined,
  collections: undefined,
};

AdminProductsEdit.propTypes = {
  onLoadProduct: PropTypes.func,
  match: PropTypes.any, // react-router
  localtion: PropTypes.any, // react-router
  history: PropTypes.any, // react-router
  product: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.any,
  categories: PropTypes.any,
  collections: PropTypes.any,
};
```

- https://github.com/reactjs/reselect#q-how-do-i-create-a-selector-that-takes-an-argument

TODO
====
- [ ] Update to create-react-app@1.1.0 https://github.com/facebookincubator/create-react-app/blob/v1.1.0/CHANGELOG.md
- [ ] Detect resize: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
- [ ] Using immutable-js in components
- [ ] Add RxJS: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html

- Product http://schema.org/Product

Product
=======

- UPC: https://en.wikipedia.org/wiki/Universal_Product_Code
- EAN: https://en.wikipedia.org/wiki/International_Article_Number
- SKU: https://en.wikipedia.org/wiki/Stock_keeping_unit
