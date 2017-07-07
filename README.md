# preact-async-route
[![build](https://api.travis-ci.org/prateekbh/preact-async-route.svg?branch=master)](https://api.travis-ci.org/prateekbh/preact-async-route.svg?branch=master)

Async route component for [preact-router](https://github.com/developit/preact-router)

`npm i -D preact-async-route`

preact-async-route provides `<AsyncRoute> ` tag to load your components lazily.

`<AsyncRoute> ` provides similar props to return a lazily loaded component either as a Promise resolving to the component or return the component in a callback.

`<AsyncRoute> `  also has a loading props, to which you can pass a component to be shown while the component is being lazily loaded.

## Usage Example
```js
  import { h, render } from 'preact';
  import Router, from 'preact-router';
  import AsyncRoute from 'preact-async-route';
  import Home from './Components/Home/Home.jsx';
  import Terms from './Components/Terms/Terms.jsx';
  import Loading from './Components/Loading/Loading.jsx';
  /** @jsx h */

  function getProfile(){
  	return System.import('../component/Profile/Profile.jsx').then(module => module.default);
  }

  const Main = () => (
  	<Router>
  		<Home path="/" />
  		<Terms path="/terms" />
  		<AsyncRoute path="/profile/:userid" component={Home} />
  		<AsyncRoute path="/friends/:userid" getComponent={getProfile}
            loading={()=>{return <Loading/>}} />
  	</Router>
  );
  ```

### License

[MIT]

[MIT]: http://choosealicense.com/licenses/mit/