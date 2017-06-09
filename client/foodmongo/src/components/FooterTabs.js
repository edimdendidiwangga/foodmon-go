import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';


class FooterTabs extends Component {

  onPressHandler = (key) => {
    console.log(`onPress ${key}`)
    // Actions.map({type: "reset"})
    if (key === 'map') {
      console.log(Actions);
      Actions.pop();
    } else if (key === 'signup') {
      Actions.signup();
    } else if (key === 'interests') {
      Actions.interests();
    } else {
      Actions.map();
    }
  }

  render() {
    return (
      <Footer >
        <FooterTab>
          <Button active vertical onPress={() => { this.onPressHandler('map'); }}>
            <Icon active name="navigate" />
            <Text>Explore</Text>
          </Button>
          <Button vertical onPress={() => { this.onPressHandler('interests'); }}>
            <Icon name="apps" />
            <Text>Interests</Text>
          </Button>
          <Button vertical>
            <Icon name="camera" />
            <Text>Camera</Text>
          </Button>
          <Button vertical onPress={() => { this.onPressHandler('signup'); }}>
            <Icon name="person" />
            <Text>Sign Up</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default FooterTabs;
