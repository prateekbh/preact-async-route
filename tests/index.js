import { h, render, Component, options } from 'preact';
import Router,{route} from 'preact-router';
import AsyncRoute from 'src/index';
import Promise from 'Promise';

describe('Async Route', () => {
	options.syncComponentUpdates = false;
	options.debounceRendering = f => f();
	class SampleTag extends Component {
		render(){
			return (<h1>hi</h1>);
		}
	}
	class ParameterizedSampleTag extends Component {
		render(){
			return (<h1>hi - {this.props.matches.pid}</h1>);
		}
	}

	it('should call the given function on mount', () => {
		let getComponent = sinon.spy();
		render(<AsyncRoute getComponent={getComponent} />, document.createElement('div'));
		expect(getComponent).called;
	});

	it('should render component when returned from the callback', () => {
		let containerTag = document.createElement('div');
		let getComponent = function(url, cb) {
			cb({component: SampleTag});
		};
		render(<AsyncRoute getComponent={getComponent} />, containerTag);
		expect(containerTag.innerHTML).equal('<h1>hi</h1>');
	});

	it('should render component when resolved through a promise from a function', () => {
		let containerTag = document.createElement('div');
		const startTime = Date.now();
		const componentPromise = new Promise(resolve=>{
			setTimeout(()=>{
				resolve(SampleTag);
			},800);
		});

		let getComponent = function() {
			return componentPromise;
		};

		render(<AsyncRoute getComponent={getComponent} />, containerTag);

		componentPromise.then(()=>{
			const endTime = Date.now();
			expect(endTime - startTime).to.be.greaterThan(800);
			expect(containerTag.innerHTML).equal('<h1>hi</h1>');
		});
	});

	it('should render loading component while component is not resolved', () => {
		let containerTag = document.createElement('div');
		const startTime = Date.now();
		const componentPromise = new Promise(resolve=>{
			setTimeout(()=>{
				resolve(SampleTag);
			},800);
		});

		let getComponent = function() {
			return componentPromise;
		};

		render(<AsyncRoute loading={() => <span>loading...</span>} getComponent={getComponent} />, containerTag);

		expect(containerTag.innerHTML).equal('<span>loading...</span>');

		componentPromise.then(()=>{
			const endTime = Date.now();
			expect(endTime - startTime).to.be.greaterThan(800);
			expect(containerTag.innerHTML).equal('<h1>hi</h1>');
		});
	});

	it('should get all props', () => {
		let containerTag = document.createElement('div');
		class PropsTag extends Component {
			render(){
				return (<h1>hi - {this.props.matches.pid} - {this.props.sequence}</h1>);
			}
		}
		let getComponent = function(url, cb) {
			cb({component: PropsTag});
		};
		render(<Router><AsyncRoute path='/profile/:pid' sequence="1" getComponent={getComponent} /></Router>, containerTag);
		route('/profile/Prateek');
		expect(containerTag.innerHTML).equal('<h1>hi - Prateek - 1</h1>');
		route('/profile/Jason');
		expect(containerTag.innerHTML).equal('<h1>hi - Jason - 1</h1>');
	});

	it('should update on url change for same component', () => {
		let containerTag = document.createElement('div');
		let getComponent = function(url, cb) {
			cb({component: ParameterizedSampleTag});
		};
		render(<Router><AsyncRoute path='/profile/:pid' getComponent={getComponent} /></Router>, containerTag);
		route('/profile/Prateek');
		expect(containerTag.innerHTML).equal('<h1>hi - Prateek</h1>');
		route('/profile/Jason');
		expect(containerTag.innerHTML).equal('<h1>hi - Jason</h1>');
	});

	it('should mount correct component in case of race conditions', (done) => {
		let containerTag = document.createElement('div');
		let getParameterizedComponent = function(url, cb) {
			return new Promise(resolve=>{
				setTimeout(()=>{
					resolve(ParameterizedSampleTag);
				},200);
			});
		};
		let getComponent = function(url, cb) {
			return new Promise(resolve=>{
				setTimeout(()=>{
					resolve(SampleTag);
				},1);
			});
		};
		render(<Router><AsyncRoute path='/profile/:pid' getComponent={getParameterizedComponent} /><AsyncRoute path='/' getComponent={getComponent} /></Router>, containerTag);
		route('/profile/Prateek');
		route('/');
		setTimeout(()=>{
			expect(containerTag.innerHTML).equal('<h1>hi</h1>');
			done();
		},400);
	});
});
