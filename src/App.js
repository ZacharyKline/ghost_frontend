import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Form, Radio, Button, Input } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { Switch } from 'react-router'
import axios from 'axios'
import { NavLink, Route } from 'react-router-dom'
import MessageList from './Components/MessageList'
const boastURL = 'http://localhost:8000/boast/'

class App extends Component {
  state = {
    posts: [],
    message: '',
    boast: ''
  }
  componentDidMount() {
    fetch(boastURL)
      .then(res => res.json())
      .then(data => {
        this.setState({ posts: data })
      })
  }

  handleCreate = event => {
    let payload = JSON.stringify({
      boast: this.state.boast,
      message: this.state.message
    })
    axios.post(boastURL,
      payload, {
      headers: { 'Content-Type': 'application/json' }
    }
    )
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        window.location.reload();

      })
    this.setState({
      message: "",
      boast: ''
    })

  }


  handleChange = event => {
    event.preventDefault();
    let input = document.getElementById('toggle');
    let voasts = document.getElementsByClassName('voast')
    let voastType = false
    for (let voast = 0; voast < voasts.length; voast++) {
      if (voasts[voast].control.checked === true) {
        voastType = true
      }
    }
    this.setState({
      message: input.value,
      boast: voastType
    });
  }


  render() {
    console.log(this.state)
    const { Header, Footer, Content } = Layout;
    return (
      < React.Fragment >
        <div>
          <Layout className="layout"
            id='backbackground'
          >
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Switch>
                  <ul className='menu'>
                    <li className='menu1'><NavLink exact to="/">Home</NavLink></li>
                    <li className='menu2'><NavLink to="/boasts">Boasts</NavLink></li>
                    <li className='menu3'><NavLink to="/roasts">Roasts</NavLink></li>
                    <li className='menu4'><NavLink to="/updooted">Most Upvoted</NavLink></li>
                    <li className='menu5'><NavLink to="/downdooted">Most Downvoted</NavLink></li>
                  </ul>
                </Switch>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <br />
              <div className='foamy'>
                <h1 className='titles'>Make a Boast/Roast</h1>
                <Form>
                  <Form.Item>
                    <Input
                      id='toggle'
                      placeholder="Boast or Bitch"
                      autoFocus
                      onChange={this.handleChange}
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.handleCreate(event)
                        }
                      }}
                      value={this.state.message}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Radio.Group defaultValue="roast" onChange={this.handleChange}>
                      <Radio.Button value="boast" className='voast'>Boast</Radio.Button>
                      <Radio.Button value="roast" >Roast</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" onClick={this.handleCreate}>Submit</Button>
                  </Form.Item>
                </Form>
              </div>
              <br />
              <br />

              <div style={{
                background: '#fff',
                padding: 24,
                minHeight: 280,
              }}
                className='backyWacky'
              >
                <Route exact path="/" render={() => (
                  <MessageList posts={this.state.posts} />
                )}>
                </Route>
                <Route path='/boasts' render={() => (
                  <MessageList posts={this.state.posts.filter(post => {
                    if (post.boast === true) {
                      return post
                    } else {
                      return false
                    }
                  })} />
                )}>
                </Route>
                <Route path='/roasts' render={() => (
                  <MessageList posts={this.state.posts.filter(post => {
                    if (post.boast === false) {
                      return post
                    } else {
                      return false
                    }
                  })} />
                )}>
                </Route>
                <Route path="/updooted" render={() => (
                  <MessageList posts={this.state.posts.sort((a, b) => {
                    return b.total_votes - a.total_votes
                  })} />
                )}>
                </Route>
                <Route path="/downdooted" render={() => (
                  <MessageList posts={this.state.posts.sort((a, b) => {
                    return a.total_votes - b.total_votes
                  })} />
                )}>
                </Route>
              </div>

            </Content>
            <Footer className='footy' style={{ fontSize: '25px' }}>Created by Zachary Kline</Footer>
          </Layout>,
        </div>
      </React.Fragment >
    );
  }
}

export default App;
