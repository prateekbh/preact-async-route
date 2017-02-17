import {h, Component} from 'preact';
import {Link} from 'preact-router';

export default class Home extends Component {
	render() {
		return <h1>
			This is Profile page of {this.props.matches.pid}
			<div><Link href='/profile/blah'>blah profile</Link></div>
			<Link href='/terms'>terms</Link>
		</h1>;
	}
}