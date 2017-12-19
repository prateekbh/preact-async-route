(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('preact')) :
	typeof define === 'function' && define.amd ? define(['preact'], factory) :
	(global['preact-async-route'] = factory(global.preact));
}(this, (function (preact) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncRoute = function (_Component) {
	_inherits(AsyncRoute, _Component);

	function AsyncRoute() {
		_classCallCheck(this, AsyncRoute);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.state = {
			componentData: null
		};
		return _this;
	}

	AsyncRoute.prototype.loadComponent = function loadComponent() {
		var _this2 = this;

		if (this.props.component) {
			return this.setState({
				componentData: this.props.component
			});
		}
		var componentData = this.props.getComponent(this.props.url, function (_ref) {
			var component = _ref.component;

			// Named param for making callback future proof
			if (component) {
				_this2.setState({
					componentData: component
				});
			}
		}, _extends({}, this.props, this.props.matches));

		// In case returned value was a promise
		if (componentData && componentData.then) {
			// IIFE to check if a later ending promise was creating a race condition
			// Check test case for more info
			(function (url) {
				componentData.then(function (component) {
					if (url !== _this2.props.url) {
						_this2.setState({ componentData: null }, function () {
							_this2.loadComponent();
						});
						return;
					}
					_this2.setState({
						componentData: component
					});
				});
			})(this.props.url);
		}
	};

	AsyncRoute.prototype.componentDidMount = function componentDidMount() {
		this.loadComponent();
	};

	AsyncRoute.prototype.render = function render() {
		if (this.state.componentData) {
			return preact.h(this.state.componentData, this.props);
		} else if (this.props.loading) {
			var loadingComponent = this.props.loading();
			return loadingComponent;
		}
		return null;
	};

	return AsyncRoute;
}(preact.Component);

return AsyncRoute;

})));
//# sourceMappingURL=index.js.map
