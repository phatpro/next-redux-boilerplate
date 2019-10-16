import React from 'react';
import initReduxStore from './initReduxStore';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

// Get or create redux store
function getOrCreateStore(initialState) {
	// Always make a new store if server, otherwise state is shared between requests (bad)
	if (isServer) {
		return initReduxStore(initialState);
	}

	// Create store if unavailable on the client and set it on the window object
	if (!window[__NEXT_REDUX_STORE__]) {
		window[__NEXT_REDUX_STORE__] = initReduxStore(initialState);
	}

	// Reuse store if available on the client
	return window[__NEXT_REDUX_STORE__];
}

const withReduxStore = (App) => {
	return class WithReduxStore extends React.Component {
		static async getInitialProps(appContext) {
			// Get or create redux store
			const reduxStore = getOrCreateStore();

			// Provide the store to getInitialProps of pages
			appContext.ctx.reduxStore = reduxStore;

			let appProps = {};
			if (typeof App.getInitialProps === 'function') {
				appProps = await App.getInitialProps(appContext);
			}

			return {
				...appProps,
				reduxState: reduxStore.getState()
			};
		}

		constructor(props) {
			// Why need super ?
			// Simple, you can't use this if super not called before
			super(props);
			this.reduxStore = getOrCreateStore(this.props.reduxState);
		}

		render = () => <App {...this.props} reduxStore={this.reduxStore} />;
	};
};

export default withReduxStore;
