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
	return new Promise(resolve=>{
		setTimeout(()=>{
			System.import('./components/Terms').then(module => {resolve(module.default);});
		},2000);
	});
}

render(
	<Router>
		<Route path='/' component={Home}/>
		<AsyncRoute path='/profile/:pid' component={getProfile} />
		<AsyncRoute path='/terms' component={getTerms} loading={()=>{return (<span>loading2...</span>);}}/>
	</Router>,
	document.getElementById('app')
);