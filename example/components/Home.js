import {h, Component} from 'preact';
import {Link} from 'preact-router';

export default class Home extends Component {
	render() {
		return <h1>
			This is home page
			<Link href='/profile/prateek'>Prateek</Link>
		</h1>;
	}
}