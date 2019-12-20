import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios'
import '../index.css';

const URL = 'http://localhost:8000/boast/'


class Message extends Component {
    state = {
        like: false,
        unlike: false,
        id: 0,
    }

    handleLike = event => {
        let payload = this.props.id
        axios.get(URL + payload + '/upvote')
            .then(res => res.json)
            .then(data => {
                this.setState({ like: data })
            })
            .then(res => {
                window.location.reload();

            })
        console.log('CLACK')
    }

    handleDislike = event => {
        let payload = this.props.id
        axios.get(URL + payload + '/downvote')
            .then(res => res.json)
            .then(data => {
                this.setState({ like: data })
            })
            .then(res => {
                window.location.reload();

            })
        console.log('CLICK')
    }
    render() {
        return (
            <React.Fragment>
                <div style={{ padding: '20px' }}>
                    <Card
                        bordered={false}
                        style={{
                            width: 300,
                            background: '#ECECEC',
                            margin: '5px',
                        }}
                        className='cardyB'
                    >
                        <div>
                            <h3>{this.props.message}</h3>
                            <div className='updoots'>
                                <button onClick={this.handleLike}><Icon type="up-circle" /></button>
                                <h3>{this.props.total_votes} </h3>
                                <button onClick={this.handleDislike}><Icon type="down-circle" /></button>
                            </div>
                            <p style={{ float: 'right' }}>{this.props.post_time}</p>
                        </div>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}


export default Message