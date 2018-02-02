import React from 'react';
import { Grid, Icon, Image, Segment, Header } from 'semantic-ui-react';
import axios from 'axios';
import '../../dist/assets/profilePage.css';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profileImage: '',
    };
  }

  componentDidMount() {
    if (this.props.currentUser.userId === '') {
      axios.get('/userProfile')
        .then((res) => {
          const profileImage = this.resizeProfileImage(res.data.profileImage);
          this.setState({
            username: res.data.username,
            profileImage,
          }, () => console.log('STATE', this.state));
          this.props.setCurrentUser(res.data);
        })
        .catch(err => console.log(err));
    } else {
      const profileImage = this.resizeProfileImage(this.props.currentUser.profileImage);
      this.setState({
        username: this.props.currentUser.username,
        profileImage,
      });
    }
  }

  getDecks(userId) {
    axios.get('api/userDecks')
  }

  resizeProfileImage(imageUrl) {
    this.state;
    const sizeIndex = imageUrl.indexOf('sz=') + 3;
    const newUrl = `${imageUrl.slice(0, sizeIndex)}300`;
    return newUrl;
  }

  render() {
    console.log('USER STATE:', this.state);
    return (
      <Grid columns="equal">
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={12}>
         <div style={{ height: '30px' }}></div>
          <div className="user-info-container">
            <Segment raised>
              <div className="user-info">
                <Image src={this.state.profileImage} circular centered />
                <Header as="h1" textAlign="center">{this.state.username}</Header>
                <Header textAlign="center">A subheader</Header>
                <Icon name="user" />
              </div>
            </Segment>
          </div>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid>
    );
  }
}
