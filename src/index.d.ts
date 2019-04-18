import { Component, FunctionalComponent, JSX } from 'preact';

interface IAsyncRouteProps {
    path: string;
    component?: any;
    getComponent?: (
        this: AsyncRoute,
        url: string,
        callback: (component: any) => void,
        props: any
    ) => Promise<any> | void;
    loading?: () => JSX.Element;
    [key:string]: any;
}

export default class AsyncRoute extends Component<IAsyncRouteProps, {}> {
    public render(): JSX.Element | null;
}
