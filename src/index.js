import { h, Component } from 'preact';

class AsyncRoute extends Component {
	constructor() {
		super();
		this.state = {
			componentData: null
		};
	}
	loadComponent(){
		const componentData = this.props.component(this.props.url, ({component}) => {
            // Named param for making callback future proof
			if (component) {
				this.setState({
					componentData: component
				});
			}
		});

		// In case returned value was a promise
		if (componentData && componentData.then) {
			// IIFE to check if a later ending promise was creating a race condition
			// Check test case for more info
			((url)=>{
				componentData.then(component => {
					if (url === this.props.url) {
						this.setState({
							componentData: component
						});
					}
				});
			})(this.props.url);
		}
	}
	componentDidMount(){
		this.loadComponent();
	}
	componentWillReceiveProps(nextProps){
		if (this.props.url && this.props.url !== nextProps.url) {
			this.setState({
				componentData: null
			}, ()=>{
				this.loadComponent();
			});
		}
	}
	render(){

		if (this.state.componentData) {
			return h(this.state.componentData, this.props);
		} else if (this.props.loading) {
			const loadingComponent = this.props.loading();
			return loadingComponent;
		}
		return null;
	}
}

export default AsyncRoute;