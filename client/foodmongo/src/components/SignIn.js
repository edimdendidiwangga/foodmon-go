import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Body, Title, Text, Content, Item, Input, Label, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { signin, addCounter } from '../actions';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    this.props.signin(this.state);
    // Actions.profile()
  }

  onSignUp() {
    Actions.signup();
    this.props.addCounter();
  }

  render() {
    // console.log('login',this.props.userLogin)
    return (
      <Container style={{ backgroundColor: '#F0F0F0' }}>
        <Header>
          <Body>
            <Title>Sign In</Title>
          </Body>
        </Header>
        <Content style={{ padding: 20 }}>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input onChangeText={username => this.setState({ username })} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry onChangeText={password => this.setState({ password })} />
          </Item>
          <Button style={{ marginTop: 20 }} rounded success onPress={() => this.onLogin()} >
            <Text>Sign In</Text>
          </Button>
          <Text style={{ paddingTop: 50, fontSize: 12, color: 'blue' }} onPress={() => this.onSignUp()} > Don&apos;t have an account? Sign up now.</Text>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userLogin: state,
});

const mapDispatchToProps = dispatch => ({
  signin: data => dispatch(signin(data)),
  addCounter: () => { dispatch(addCounter()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
