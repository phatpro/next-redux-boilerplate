import React, { Component } from 'react';
import NextApp from 'next/app';

// hocs
import withReduxStore from '../lib/withReduxStore';

// providers
import { Provider } from 'react-redux';

// components
import Layout from '../components/Layout';

class App extends NextApp {
	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.getElementById('css-server-side');
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}

	render() {
		const { Component, pageProps, reduxStore } = this.props;

		return (
			<Provider store={reduxStore}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		);
	}
}

export default withReduxStore(App);
