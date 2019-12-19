import React, { Component } from 'react';
import Message from './Message'

class MessageList extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.posts.map(messages =>
                    <Message
                        id={messages.id}
                        key={messages.id}
                        message={messages.message}
                        total_votes={messages.total_votes}
                        post_time={messages.post_time}
                    />
                )}
            </React.Fragment>
        )
    }
}

export default MessageList