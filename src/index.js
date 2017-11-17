import * as React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';

class DeferredRoute extends React.Component {
  constructor(props, context) {
    super(props);

    const currentPath = context.router.route.location.pathname;
    const { path } = this.props;

    this.state = { mounted: path === currentPath };
    this.lastActionTime = +new Date();
    this.lastActionId = -1;
  }
  componentWillUnmount() {
    clearTimeout(this.lastActionId);
  }

  render() {
    const currentPath = this.context.router.route.location.pathname;
    const { path, delay, component, innerProps, onUnmounting } = this.props;
    const { mounted } = this.state;
    const { lastActionTime } = this;
    const pathsEqual = currentPath.startsWith(path);
    const currentTime = +new Date();
    const timeFromLastAction = currentTime - lastActionTime;
    const inAction = timeFromLastAction <= delay;

    if (mounted) {
      if (pathsEqual) {
        clearTimeout(this.lastActionId);
        return (
          <Route
            path={path}
            render={routerProps =>
              React.createElement(component, Object.assign({}, routerProps, innerProps))
            }
          />
        );
      } else {
        if (!inAction) {
          this.lastActionId = setTimeout(() => {
            this.setState({ mounted: false });
          }, delay);
          this.lastActionTime = currentTime;
        }
        return (
          <Route
            render={routerProps =>
              React.createElement(
                component,
                Object.assign({}, routerProps, innerProps, onUnmounting)
              )
            }
          />
        );
      }
    } else {
      if (pathsEqual) {
        clearTimeout(this.lastActionId);
        setTimeout(() => this.setState({ mounted: true }));
      }
      return (
        <Route
          path={path}
          render={routerProps =>
            React.createElement(component, Object.assign({}, routerProps, innerProps))
          }
        />
      );
    }
  }
}

DeferredRoute.contextTypes = {
  router: PropTypes.shape({
    route: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }),
    }),
  }),
};

DeferredRoute.propTypes = {
  component: PropTypes.func.isRequired,
  delay: PropTypes.number,
  onUnmounting: PropTypes.object,
  innerProps: PropTypes.object,
  path: PropTypes.string,
};

DeferredRoute.defaultProps = {
  delay: 1000,
  onUnMount: null,
  innerProps: null,
  path: '/',
};

export default DeferredRoute;
