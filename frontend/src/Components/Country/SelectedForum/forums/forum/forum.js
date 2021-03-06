import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { likePost, unlikePost, getPost } from '../../../../../actions/postAction'
import { withRouter } from 'react-router-dom'

class Forum extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: [],
            errors: {}
        }
    }

    jsonEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    onLikeClick(id, event) {
        event.preventDefault();
        console.log(id)
        if (this.props.auth.isAuthenticated) {
            this.props.likePost(id)
        } else {
            this.props.history.push('/login')
        }
    }

    onUnlikeClick(id, event) {
        event.preventDefault();
        console.log(id)
        if (this.props.auth.isAuthenticated) {
            this.props.unlikePost(id)
        } else {
            this.props.history.push('/login')
        }
    }

    componentDidUpdate() {
        const likes = this.props.likes
        if (!this.jsonEqual(likes, this.state.likes)) {
            this.setState({ likes: likes });
        }
    }

    componentDidMount() {
        let likes = this.props.likes
        console.log(likes)
        this.setState({ likes: likes });
    }

    render() {
        return (
            <div className="post">
                <div className="">
                    <button className="fas fa-arrow-circle-up like" onClick={this.onLikeClick.bind(this, this.props.id)}></button>
                </div>
                <div className="">
                    <button className="fas fa-arrow-circle-down unLike" onClick={this.onUnlikeClick.bind(this, this.props.id)}></button>
                </div>
                <div className="totalLikes">
                    <p>{this.state.likes.length} users liked this post</p>
                </div>
                <h1>{this.props.title}</h1>
                <div className="postInfo">
                    <p class="pCountry">Country: {this.props.country}</p>
                    <p class="pUser">User: {this.props.user}</p>
                    <p class="pDate">Date: {this.props.date.toString().slice(0, 10)}</p>
                </div>
                <div className="postContent">
                    <p>{this.props.text}</p>
                </div>
            </div>
        )
    }
}

Forum.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { likePost, unlikePost, getPost })(withRouter(Forum))