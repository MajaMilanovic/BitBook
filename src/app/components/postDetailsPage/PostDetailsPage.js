import React, { Fragment } from "react";
import { Comment } from "./Comment";
import { TextPost } from "../feedpage/TextPost";
import { ImagePost } from "../feedpage/ImagePost";
import { VideoPost } from "../feedpage/VideoPost";
import { NewComment } from "./NewComment";
import { postService } from "../../../services/PostService";
import { commentService } from "../../../services/CommentService";
import { Loader } from "../../partials/Loader";

class PostDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postObject: null,
            comments: []
        }
    }

    fetchPost = () => {
        const { id, type } = this.props.match.params;
        return postService.getPost(type, id);
    }

    fetchComments = () => {
        const id = this.props.match.params.id;
        return commentService.getComments(id)
            .then(response => {
                this.setState({
                    comments: response
                });
            }
            );
    }

    componentDidMount() {
        this.fetchPost()
            .then(response => {
                this.setState({ postObject: response })
            });
        this.fetchComments();
    }

    displayPost = () => {
        const postObject = this.state.postObject;

        if (postObject.type === "image") {
            return <ImagePost post={postObject} hasFooter={false} />
        } else if (postObject.type === "text") {
            return <TextPost post={postObject} hasFooter={false} />
        } else if (postObject.type === "video") {
            return <VideoPost post={postObject} hasFooter={false} />
        }
    }

    render() {
        if (!this.state.postObject) {
            return <Loader />
        }
        const comments = (this.state.comments).reverse();
        return (
            <Fragment>

                {this.displayPost()}
                <NewComment postId={this.state.postObject.id} fetchComments={this.fetchComments} />
                {(comments.length !== 0) ? comments.map((comment, index) => {
                    const newComment = new Comment(comment);
                    return <Comment comment={newComment} key={index} />
                }) : <div className="card no-comment-card">There are no comments yet...</div>}
            </Fragment>
        );
    }
}

export { PostDetailsPage }