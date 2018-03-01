import { Component, FunctionalComponent } from 'preact';

interface IAsyncRouteProps {
    path: string;
}

export interface IAsyncRouteSyncProps extends IAsyncRouteProps {
    component: Component<any, any> | FunctionalComponent<any>;
}

export interface IAsyncRouteAsyncProps extends IAsyncRouteProps {
    getComponent: (
        this: AsyncRoute,
        url: string,
        callback: (component: Component<any, any> | FunctionalComponent<any>) => void,
        props: any
    ) => Promise<Component<any, any> | FunctionalComponent<any>> | void;
    loading?: () => JSX.Element;
}

export default class AsyncRoute extends Component<IAsyncRouteSyncProps | IAsyncRouteAsyncProps, {}> {
    public render(props?: IAsyncRouteSyncProps | IAsyncRouteAsyncProps): JSX.Element | null;
}
