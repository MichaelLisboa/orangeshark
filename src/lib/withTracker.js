import React, { Component } from 'react';
import ReactGA from 'react-ga';

// ADD UA CODE HERE
ReactGA.initialize('*');
ReactGA.pageview(window.location.pathname + window.location.search);

export default function withTracker (WrappedComponent, options = {}) {
    const trackPage = (page) => {
        ReactGA.set({
            page,
            ...options
        });
        ReactGA.pageview(page);
    };

    const HOC = class extends Component {
        componentDidMount () {
            const page = this.props.location.pathname;
            trackPage(page);
        }

        componentDidUpdate (nextProps) {
            const currentPage = this.props.location.pathname;
            const nextPage = nextProps.location.pathname;

            if (currentPage !== nextPage) {
                trackPage(nextPage);
            }
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    };

    return HOC;
}
