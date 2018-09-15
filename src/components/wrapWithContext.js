import React from 'react';
import { AppContext } from 'App';

export function wrapWithContext(ToWrap) {
    return function wrapped(props) {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <ToWrap
                        app={context.app}
                        showLoader={context.showLoader}
                        hideLoader={context.hideLoader}
                        uid={context.uid}
                        userType={context.userType}
                        {...props}
                    />
                )}
            </AppContext.Consumer>
        );
    };
}
