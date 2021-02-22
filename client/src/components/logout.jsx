import { Component } from 'react';
import userService from '../services/userService';

class LogOut extends Component {
  state = {  }

  componentDidMount(){
    userService.logout();
    window.location="/signin"
  }
  render() { 
    return null;
  }
}
 
export default LogOut;