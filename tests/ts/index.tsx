import { h, render, Component } from 'preact';
import Router from 'preact-router';
import AsyncRoute from '../../';

/**
 * This dummy component is used to catch TypeScript
 * type issues via the TypeScript compiler.
 */

export class Index extends Component<{}, {}> {
    public render(): preact.VNode {
        return <Router>
            <AsyncRoute path="/" component={null} />
            <AsyncRoute path="/" getComponent={null} />
            <AsyncRoute path="/" getComponent={null} loading={null} />
        </Router>;
    }
}
