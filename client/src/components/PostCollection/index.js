import React from "react";
import { Modal, Button } from "react-materialize";
import API from "../../services/APIService";
import FirebaseContext from "../Firebase/context";

export class PostCollection extends React.Component {
  state = {
    title: "",
    body: "",
    value: "",
    posts: [],
    newDummyPost: [],
  };

  componentDidMount = () => {
    API.getPosts()
      .then(dbPosts => {
        this.setState({posts: dbPosts.data});
        console.log(this.state.posts);
      })
        
        
        
  }

  handleModalClick = () => {
    window.$("#modal1").modal("open");
    console.log("click");
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const newPost = { title: this.state.title, body: this.state.body, userId: this.firebase.dbUserInfo._id };
    API.createPost(newPost).then(post => console.log(post.data));
    this.setState({newDummyPost: newPost});
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.title);
    console.log(this.state.body);
  };

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          this.firebase = firebase;

          return (
            <div>
              <a
                onClick={this.handleModalClick}
                class="waves-effect waves-light btn modal-trigger"
                href="#modal1"
              >
                Modal
              </a>
              <Modal id="modal1">
                {" "}
                <div class="row">
                  <form class="col s12">
                    <div class="row">
                      <div class="input-field col s6">
                        <input
                          id="input_text"
                          type="text"
                          data-length="10"
                          onChange={this.handleInputChange}
                          value={this.state.title}
                          name="title"
                        />
                        <label for="input_text">Title</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s12">
                        <textarea
                          id="textarea2"
                          class="materialize-textarea"
                          data-length="120"
                          onChange={this.handleInputChange}
                          value={this.state.body}
                          name="body"
                        />
                        <label for="textarea2">Body</label>
                      </div>
                    </div>
                  </form>
                </div>
                <Button onClick={this.handleFormSubmit} waves="light">
                  Submit
                </Button>
              </Modal>
{/* create a element and map over this.state.posts and display */}
          {this.state.posts.map(post => <div><h1>{post.title}</h1><h2>{post.body}</h2></div>)}


            </div>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}