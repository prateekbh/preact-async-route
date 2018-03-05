import { Component, FunctionalComponent } from 'preact';

interface IAsyncRouteProps {
    component?: any;
    getComponent?: (
        this: AsyncRoute,
        url: string,
        callback: (component: any) => void,
        props: any
    ) => Promise<any> | void;
    loading?: () => JSX.Element;
}

export default class AsyncRoute extends Component<IAsyncRouteProps, {}> {
    public render(): JSX.Element | null;
}
