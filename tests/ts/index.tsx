import { h, render, Component } from 'preact';
import Router from 'preact-router';
import AsyncRoute from '../../';

/**
 * This dummy component is used to catch TypeScript
 * type issues via the TypeScript compiler.
 */

function componentFetcher(url: string, cb: (c: any) => void, props: any): Promise<any> | void {}
function loadingAnimation(): JSX.Element | any {
    return <div></div>;
}
type LabelProps = {
    value: string
}

function labelize({props}: { props: LabelProps }): JSX.Element {
    return <label>{props.value}</label>
}
export class Index extends Component<{}, {}> {
    public render(): JSX.Element {
        return <Router>
            <AsyncRoute path="/" component={Router} />
            <AsyncRoute path="/" getComponent={componentFetcher} />
            <AsyncRoute path="/" getComponent={componentFetcher} loading={loadingAnimation} />
            <AsyncRoute path="/" component={labelize} value="Label me!" />
        </Router>;
    }
}
