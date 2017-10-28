# react-router-deferred-route

## Usage example
```javascript
import DeferredRoute from 'react-router-deffered-route';

//...

  render(){
    //...
    return (
      <DeferredRoute
        path="/target"
        component={MyAwesomeComponent}
        delay={300} // ms of component exist after url was changed to not match 'path' property
        innerProps={{ style: { transform: 'scale(1)', transition: 'transform .3s linear' }}}
        onUnmounting={{ style: { transform: 'scale(0)', transition: 'transform .3s linear' }}}
      />
    )
  }

//...
```