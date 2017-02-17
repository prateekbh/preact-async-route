import { h, render } from 'preact';
import {Router, Route, route} from 'preact-router';
import AsyncRoute from '../src/';
import Home from './components/Home';

function getProfile() {
	return new Promise(resolve=>{
		setTimeout(()=>{
			System.import('./components/Profile').then(module => {resolve(module.default);});
		},2000);
	});
}

function getTerms() {
	return System.import('./components/Terms').then(module => module.default);
}

render(
	<Router>
		<Route path='/' component={Home}/>
		<AsyncRoute path='/profile/:pid' component={getProfile} loading={()=><span>loading...</span>}/>
		<AsyncRoute path='/terms' component={getTerms}/>
	</Router>,
	document.getElementById('app')
);