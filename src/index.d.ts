import { Component, h } from 'preact';

interface IAsyncRouteProps {
    path: string;
    component?: any;
    getComponent?: (
        this: AsyncRoute,
        url: string,
        callback: (component: any) => void,
        props: any
    ) => Promise<any> | void;
    loading?: () => h.JSX.Element;
    [key:string]: any;
}

export default class AsyncRoute extends Component<IAsyncRouteProps, {}> {
    public render(): h.JSX.Element | null;
}
