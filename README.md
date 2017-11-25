# react-router-deferred-route

## Simple way to defer unmount your route component

### Instalation

```bash
npm install react-router-deferred-route --save
```

### Usage example

> add a nice animation of the disappearance

```javascript
import DeferredRoute from 'react-router-deferred-route';

//...

  render(){
    //...
    return (
      <DeferredRoute
        path="/target"
        component={MyAwesomeComponent}
        delay={300}
        innerProps={{ style: { transform: 'scale(1)', transition: 'transform .3s linear' }}}
        onUnmounting={{ style: { transform: 'scale(0)', transition: 'transform .3s linear' }}}
      />
    )
  }
//...
```

### Explanation

`DeferredRoute` always returns `Route` component (from `react-router`), so you can use it with `Switch`. But when `path` in `DeferredRoute` becomes not equal with `router.route.location.pathname` (current url), `Route` returned without any `path` property, so that stay will exist for `delay` time. After `delay` `path` will be returned to `Route` and that will disappear probably. As a bonus you can set `onUnmounting` property, to be added in props to the component only when target path and the current path is not equal.

> component get `Route` properties

> works with `react-router` **v4**

### API

```javascript
DeferredRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  delay: PropTypes.number,
  innerProps: PropTypes.object,
  onUnmounting: PropTypes.object,
};

DeferredRoute.defaultProps = {
  path: '/',
  delay: 1000,
  innerProps: null,
  onUnmounting: null,
};
```

### Please, let me [know](https://github.com/artalar/react-router-deferred-route/issues) if you need options like `exact`, `render` (from original `Route`) or `availeblePaths` (for trigger delay only for a limited set of paths, not for all). I can add that.