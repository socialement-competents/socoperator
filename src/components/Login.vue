<template>
  <div class="login-page">
    <transition name="loginslide">
      <div v-if="!isLoggedIn" class="login-container">
        <div class="title">
          <h1><span class="s-letter">S</span>ocoperator</h1>
        </div>
        <v-layout class="form-login" row wrap>
          <v-flex xs12 class="email">
            <v-text-field
              id="email"
              v-model="email"
              name="email-input"
              label="email"
              :hide-details="true"
              color="socoblue"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="password">
            <v-text-field
              id="password"
              name="password-input"
              v-model="password"
              @keyup.enter="logIn({ email, password})"
              label="Password"
              :append-icon="passtype ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (passtype = !passtype)"
              :type="passtype ? 'password' : 'text'"
              :hide-details="true"
              color="socoblue"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <div v-if="loginError" class="login-error">
          Erreur de soconnexion !<br>
          Login ou mot de passe invalide
        </div>
        <div v-if="isRegistering" class="login-button-container">
          <v-btn
            class="login-button"
            color="socolightblue"
            dark
            @click="register({ email, password })"
          >Valider</v-btn>
        </div>
        <v-layout v-else row wrap class="login-button-container">
          <v-flex xs6>
            <v-btn
              class="login-button"
              color="socolightblue"
              dark
              @click="isRegistering = true"
            >S'enregister</v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn
              class="login-button"
              color="socogreen"
              dark
              @click="logIn({ email, password })"
            >Soconnecter</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'

@Component({
  computed: mapGetters(['isLoggedIn', 'loginError']),
  methods: mapActions(['logIn', 'register'])
})
export default class Login extends Vue {
  email: string = ''
  password: string = ''
  passtype: boolean = true
  isRegistering: boolean

  constructor () {
    super()

    this.isRegistering = false
  }
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

.form-login .email{
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

.loginslide-enter-active {
  animation: loginslide 1.5s;
}
.loginslide-leave-active {
  animation: loginslide 1.5s reverse;
}

@keyframes loginslide {
  from {left:-60%;}
  to {left: 0%;}
}

.login-error {
  top: 50px;
  position: relative;
  color: #ff5252;
  font-weight: 600;
}
</style>
