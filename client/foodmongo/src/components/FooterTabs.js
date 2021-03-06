import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { addCounter, subtractCounter, resetCounter } from '../actions';

export class FooterTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'map',
      auth_title: 'Sign In',
    };
  }

  componentDidMount() {
    console.log('this.props.user_login ', this.props.user_login);
    AsyncStorage.getItem('token', (err1, token) => {
      console.log('FooterTabs componentDidMount', token);
      if (token) {
        this.setState({
          auth_title: 'Profile',
        });
      }
    });
  }

  onPressHandler = (key) => {
    console.log(`onPress ${key}`);

    if (key === 'map') {
      console.log('nav_counter=', this.props.nav_counter);
      if (this.props.nav_counter > 1) {
        Actions.pop({ popNum: this.props.nav_counter });
      } else {
        Actions.pop();
      }
      this.props.resetCounter();
    } else if (key === 'auth') {
      console.log('nav_counter=', this.props.nav_counter);

      AsyncStorage.getItem('token', (err, result) => {
        if (result) {
          Actions.profile();
        } else {
          Actions.signin();
        }
        // Actions.signin();
      });
      console.log('*** FooterTab Actions.currentRouter.currentRoute=', Actions);

      if (this.state.selectedTab !== key) {
        this.props.addCounter();
      }
    } else if (key === 'interests') {
      if (this.state.selectedTab !== key) {
        this.props.addCounter();
      }
      Actions.interests();
    } else if (key === 'swiper') {
      if (this.state.selectedTab !== key) {
        this.props.addCounter();
      }
      Actions.swiper();
    } else {
      Actions.map();
    }

    this.setState({ selectedTab: key });
  }


  render() {
    return (
      <Footer >
        <FooterTab>
          <Button active={this.state.selectedTab === 'map'} vertical onPress={() => { this.onPressHandler('map'); }}>
            <Icon name="md-compass" />
            <Text>Explore</Text>
          </Button>
          <Button active={this.state.selectedTab === 'interests'} vertical onPress={() => { this.onPressHandler('interests'); }}>
            <Icon name="md-star" />
            <Text>Interests</Text>
          </Button>
          <Button active={this.state.selectedTab === 'swiper'} vertical onPress={() => { this.onPressHandler('swiper'); }}>
            <Icon name="md-images" />
            <Text>List</Text>
          </Button>
          <Button active={this.state.selectedTab === 'auth'} vertical onPress={() => { this.onPressHandler('auth'); }}>
            <Icon name="md-person" />
            <Text>{this.props.user_login.username ? 'Profile' : 'Sign In'}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const mapStateToProps = state => ({
  nav_counter: state.NavReducer.counter,
  user_login: state.UserReducer,
});

const mapDispatchToProps = dispatch => ({
  addCounter: () => { dispatch(addCounter()); },
  subtractCounter: () => { dispatch(subtractCounter()); },
  resetCounter: () => { dispatch(resetCounter()); },
});

const connectedFooterTabs = connect(mapStateToProps, mapDispatchToProps)(FooterTabs);
export default connectedFooterTabs;
