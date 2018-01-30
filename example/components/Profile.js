import {h, Component} from 'preact';
import {Link, route} from 'preact-router';

export default class Home extends Component {
  routeToLink() {
    route('/terms');
  }
	render() {
		return <h1>
			This is Profile page of {this.props.matches.pid}
			<div><Link href='/profile/blah'>blah profile</Link></div>
			<Link href='/terms'>terms</Link>
      <div href='/terms' onClick={this.routeToLink}>terms via route</div>
		</h1>;
	}
}