<template>
  <div class="login-page">
    <div class="login-container">
      <v-layout row wrap class="title">
        <h1><span class="s-letter">S</span>ocoperator</h1>
      </v-layout>
      <v-layout class="form-login" row wrap>
        <v-flex xs12 class="username">
          <v-text-field
            id="username"
            name="username-input"
            label="Username"
            :hide-details="true"
            color="socoblue"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 class="password">
          <v-text-field
            id="password"
            name="password-input"
            label="Password"
            :append-icon="passtype ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passtype = !passtype)"
            :type="passtype ? 'password' : 'text'"
            :hide-details="true"
            color="socoblue"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="login-button-container">
        <v-btn class="login-button" color="socogreen" dark>Soconnecter</v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Login extends Vue {
  username:string = ''
  password:string = ''
  passtype:boolean = true
}
</script>

<style>

.login-page{
  background-image: url("../assets/background.jpg");
  background-size: cover;
  height: 100%;
}

.login-container{
  background: #fff;
  height: 100%;
  width: 40%;
  position: relative;
  left: 0%;
}

.login-container::before{
  content: close-quote;
  height: 100%;
  width: 50%;
  position: absolute;
  margin-left: 30%;
  -webkit-transform: skew(13deg);
  -moz-transform: skew(20deg);
  -o-transform: skew(20deg);
  background: white;
  box-shadow:14px 0px 20px -10px #0000008f;
  left: 45%;
}

.form-login{
  width: 60%;
  margin-left: 20%;
  position: relative;
  border: 1px solid #dedede;
  border-radius: 4px;
}

.form-login .username{
  padding: 10px;
}

.form-login .password{
  padding: 10px;
  border-top: 1px solid #dedede;
}

.title{
  justify-content: center;
  position: relative;
  color: #29047A;
  padding-top: 20%;
  padding-bottom: 20%;
}

.title .s-letter{
  color: #02FAA8;
}

.login-button-container{
  position: relative;
  align-items: center;
  margin-left: 20%;
  padding-top: 15%;
  width: 60%;
  justify-content: flex-end;
}

.login-button-container .login-button{
  font-weight: 900; 
}

.login-container.sliding{
  animation-name: loginslide;
  animation-duration: 4s;
}

@keyframes loginslide {
  from {left: 0%;}
  to {left:-60%;}
}

</style>
