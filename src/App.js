import axios from 'axios';
import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: [],
      dataPost: {
        id: 0,
        title: '',
        body: ''
      }
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  reloadData() {
    axios.get('http://localhost:3004/posts').then(
      res => {
        this.setState({
          dataApi: res.data
        })
      }
    );
  }

  onSubmitForm() {
    axios.post('http://localhost:3004/posts', this.state.dataPost).then(() => {
      this.reloadData();
    });
  }

  inputChange(e) {
    let newdataPost = { ... this.state.dataPost };
    newdataPost['id'] = new Date().getTime();
    newdataPost[e.target.name] = e.target.value;

    this.setState({
      dataPost: newdataPost
    }, () => console.log(this.state.dataPost)
    );
  }

  handleRemove(e) {
    console.log(e.target.value);
    fetch(`http://localhost:3004/posts/${e.target.value}`, { method: "DELETE" }).then(res =>
      this.reloadData());
  }
  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(res => {
    //     this.setState({
    //       dataApi: res
    //     })
    //   })
    this.reloadData();

  }
  render() {
    return (
      <div>
        <p>Hello Api</p>
        <input type='text' name='body' placeholder='Masukan Body' onChange={this.inputChange} />
        <input type='text' name='title' placeholder='Masukan Title' onChange={this.inputChange} />
        <button type='submit' onClick={this.onSubmitForm}>Add Data</button>
        {this.state.dataApi.map((dat, index) => {
          return (
            <div key={index}>
              <p>{dat.title}</p>
              <button value={dat.id} onClick={this.handleRemove}>Delete</button>
            </div>
          );
        })}
      </div>
    )

  }
}

export default App