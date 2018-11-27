/*global safari*/
import React, { Component } from 'react';
import axios from 'axios';
import LoadingSpinner from './loading-spinner';
import signin from '../services/signin';
import {BASE_URL} from '../../utils/urls';
let email = '';
let pass = '';
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      emailValue: '',
      passwordValue:''
    };
    this.loginClicked = this.loginClicked.bind(this);
    this.keyEnter = this.keyEnter.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }
  componentDidMount() {

  }

  keyEnter(e)
  {
if(e.key === 'Enter'){
  this.loginClicked();
  }
}

validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
  loginClicked(){
    var emptystr = "This field cannot be empty";
  var emailstr = "Please Enter Valid Email";
  var passstr = "Please Enter Valid Password";
    email = document.getElementById('signup-email').value;
    pass = document.getElementById('signup-password').value;
    document.getElementById('signinerrormsg').innerHTML = "";
    document.getElementById('emailerrmsg').innerHTML = "";
    document.getElementById('passerrmsg').innerHTML = "";
    this.setState({
      isloading: true
    });
    if(email == "" || pass == "")
    {
      this.setState({
        isloading: false
      });
      if(email == "" && pass !== "")
      {

        document.getElementById('emailerrmsg').innerHTML = emptystr;
        document.getElementById('passerrmsg').innerHTML = "";
      }
      else if(pass == "" && email !== "" )
      {
        if(!this.validateEmail(email))
        {
          document.getElementById('emailerrmsg').innerHTML = emailstr;
          document.getElementById('passerrmsg').innerHTML = emptystr;
        }
        else {
          document.getElementById('emailerrmsg').innerHTML = "";
          document.getElementById('passerrmsg').innerHTML = emptystr;
        }


      }
      else if(email == ""  && pass == "")
      {

        document.getElementById('emailerrmsg').innerHTML =emptystr;
        document.getElementById('passerrmsg').innerHTML = emptystr;
      }
    }
    else
    {
      if(this.validateEmail(email)){
      const self = this;
 
      signin.sigin(email,pass)
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            isloading: false
          });
          localStorage.removeItem("stack");
          localStorage.setItem("userStatus",1);
          localStorage.setItem("userEmail",response.data.email);
           localStorage.setItem("userId",response.data.cbId);
          window.location.reload()

        }
      })
      .catch(function (response) {
        self.setState({
          isloading: false
        });
        console.log(response);
        document.getElementById('signinerrormsg').innerHTML = "Id or password is incorrect";

      });

    }
    else {
      this.setState({
        isloading: false
      });
      document.getElementById('emailerrmsg').innerHTML = emailstr;
    }
  }

  }

  hide(){
    safari.self.hide();
      var newURL = BASE_URL;
      var targetWin = safari.application.activeBrowserWindow;
      targetWin.openTab().url = newURL;
  }
  render(){
    const isLoading = this.state.isloading;
    return ([
      <div class="loading-wrapper">
      { isLoading &&
        <LoadingSpinner />
      }

      <div class="main-content">
      <div class="signup-wrapper plugin-1-signup">
      <div class="account-page account-signup">
      <div class="signup-block">
      <div class="mod-signup">
      <div class="hd">
      <h1 class="txt-xxl bold">Sign In to Coupons.com</h1>
      <span class="txt-md">
      Not a member? <a class="cursor" onClick={this.hide}>Sign Up</a>
      </span>
      </div>
      <div class="bd">
      <form>
      <p class="signup-option2-label txt-lg">Use your email address:</p>
      <fieldset class="email-register">
      <label class="lbl-email" for="signup-email"></label>
      <input type="email" placeholder="Email address"  name="email" class="input-email txt-lg" id="signup-email"/>
      <p id="emailerrmsg" class="errmsg txt-md bold" data-field="email"></p>

      <label class="lbl-pwd" for="signup-password"></label>
      <input type="password" placeholder="Password" name="pwd" onKeyPress={this.keyEnter} class="input-pwd txt-lg" id="signup-password" maxlength="64"/>

      <p id="passerrmsg" class="errmsg txt-md bold" data-field="pwd"></p>


      <div class="rememme">
      <input type="checkbox" class="chkbox chk-remember-user"/>
      <label for="signin-remember-user" class="txt-md">Remember me</label>
      </div>

      </fieldset>
      <p id="signinerrormsg" class="errmsg txt-md bold" data-field="common"></p>
      <div class="cta-with-label">
      <button id="submit-button" type="button" class="btn-cta" disabled="" onClick={this.loginClicked}>Sign In</button>
      <label class="continue txt-md"></label>
      </div>
      </form>

      </div>

      </div>
      </div>

      </div>

      </div>


      </div>
      </div>
  ])
}
}


export default Login;
