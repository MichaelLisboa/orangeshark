import React, { Component } from 'react';
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import { compose } from 'recompose';
import MediaListItem from "./MediaListItem";

const RootUrl = "https://app.orangeshark.xyz"

const getMarketWatchUrl = (page) => `${RootUrl}/user/images?page=${page}`;

console.log(getMarketWatchUrl(1))

const applyUpdateResult = (result, page) => (prevState) => {
    const filteredList = result.results.filter(({ id: id1 }) => !prevState.media.some(({ id: id2 }) => id2 === id1));

    const updatedPosts = {
        media: [...prevState.media, ...filteredList],
        page: page + 1,
        next: result.next,
        isLoading: false
    }

    return updatedPosts;
}

const applySetResult = (result, page) => (prevState) => ({
    media: result.results,
    page: page + 1,
    next: result.next,
    isLoading: false,
})

const withLoading = (Component) => (props) =>
    <>
        <Component {...props} />
        <div className="interactions uk-container uk-container-expand uk-text-center uk-margin-large">
            {props.isLoading && <span className="uk-padding-remove uk-margin-remove uk-spinner" data-uk-spinner="ratio: 0.75" />}
        </div>
    </>

const withInfiniteScroll = (Component) =>
    class WithInfiniteScroll extends React.Component {
        componentDidMount() {
            window.addEventListener('scroll', this.onScroll, false);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll, false);
        }

        onScroll = () => {
            if (
                (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
                this.props.post.length &&
                !this.props.isLoading &&
                this.props.next !== null
                ) {
                this.props.onPaginatedSearch();
            }
        }

    render() {
        return <Component {...this.props} />;
    }
}

class GridContent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            media: [],
            next: null,
            page: null,
            isLoading: false
        };
    }

    onInitialSearch = (e) =>
        this.fetchPosts(1);

    onPaginatedSearch = (e) =>
        this.fetchPosts(this.state.page);

    fetchPosts = page => {
        const token = localStorage.getItem("token");
        const endpoint = getMarketWatchUrl(page);
        console.log(endpoint)
        this.setState({ isLoading: true });
        axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        .then((response) => {
            console.log("CREATE CAMPAIGN RESPONSE", page)
            this.onSetResult(response.data, page)
            // history.push(`/campaign/${response.data.id}`);
        })
        .catch((error) => {
            console.log("BIG ERROR", error);
        });
      }

    onSetResult = (result, page) =>
        page <= 1
          ? this.setState(applySetResult(result, page))
          : this.setState(applyUpdateResult(result, page));

    componentDidMount() {
        this.fetchPosts(1);
    }

    componentWillUnmount() {

    }

    render () {
        if (!this.state.media.length) return null;
        return (
            <div data-uk-filter="target: .js-filter">
                <section className="marketwatch-grid uk-margin-large-top uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
                    <div className="uk-container uk-container-expand uk-margin-large-bottom">
                        <PostListWithLoadingWithInfinite
                            key={this.state.media.id}
                            post={this.state.media}
                            page={this.state.page}
                            next={this.state.next}
                            isLoading={this.state.isLoading}
                            onPaginatedSearch={this.onPaginatedSearch}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

const PostListWithLoadingWithInfinite = compose(
    withInfiniteScroll,
    withLoading,
)(MediaListItem);

export default GridContent;
