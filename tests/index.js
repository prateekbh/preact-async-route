import { h, render, Component, options } from 'preact';
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

	it('should call the given function on mount', () => {
		let getComponent = sinon.spy();
		render(<AsyncRoute component={getComponent} />, document.createElement('div'));
		expect(getComponent).called;
	});

	it('should render component when returned from the callback', () => {
		let containerTag = document.createElement('div');
		let getComponent = function(url, cb) {
			cb({component: SampleTag});
		};
		render(<AsyncRoute component={getComponent} />, containerTag);
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

		render(<AsyncRoute component={getComponent} />, containerTag);

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

		render(<AsyncRoute loading={() => <span>loading...</span>} component={getComponent} />, containerTag);

		expect(containerTag.innerHTML).equal('<span>loading...</span>');

		componentPromise.then(()=>{
			const endTime = Date.now();
			expect(endTime - startTime).to.be.greaterThan(800);
			expect(containerTag.innerHTML).equal('<h1>hi</h1>');
		});
	});

	it('should update on url change for same component', () => {

	});
});
