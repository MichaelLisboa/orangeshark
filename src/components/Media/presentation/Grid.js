import React, { Component, useState, useEffect } from 'react';
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import { compose } from 'recompose';
import MediaListItem from "./MediaListItem";
import Sidebar from "./Sidebar";

const RootUrl = "https://app.orangeshark.xyz"

const getMarketWatchUrl = (page) => `${RootUrl}/user/images?page=${page}`;

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

const applySetResult = (result, page) => (prevState) => {
    const applyPosts = {
        media: result.results,
        page: page + 1,
        next: result.next,
        isLoading: false,
    }

    return applyPosts;
}

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

const i = [];

const MediaGrid = ({ post, page, next, isLoading, onPaginatedSearch }) => {
    const [selected, setSelected] = useState([]);
    const [selectMedia, setSelectMedia] = useState(false);
    const toggle = () => {
        setSelectMedia(!selectMedia);
        !selectMedia && Object.keys(i).forEach(k => delete i[k])
        // selectMedia ? setSelected(i) : setSelected([])
    }

    const selectedItems = item => {
        i.push(item);
        setSelected(i);
    }

    useEffect(
        () => {
            console.log("SELECTED", selected)
        }, [selected, setSelected, i]
    )

    return (
        <>
        <Sidebar toggle={toggle} selectMedia={selectMedia} setSelectMedia={setSelectMedia} selectedItems={selected} />
        <div id="content" data-uk-height-viewport="expand: true">
            <MediaListItem post={post} selectMedia={selectMedia} selectedItems={selectedItems} />
        </div>
    </>
)}

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

    onPaginatedSearch = (e) =>
        this.fetchPosts(this.state.page);

    fetchPosts = page => {
        const token = localStorage.getItem("token");
        const endpoint = getMarketWatchUrl(page);

        this.setState({ isLoading: true });
        axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        .then((response) => {
            this.onSetResult(response.data, page)
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
)(MediaGrid);

export default GridContent;
