  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams } from 'ionic-angular';
  import { HomePage } from '../home/home';
  import { Facebook } from '@ionic-native/facebook';
  import { ModalController } from 'ionic-angular';
  import { MenuController } from 'ionic-angular';
  /**
   * Generated class for the LoginPage page.
   *
   * See https://ionicframework.com/docs/components/#navigation for more info on
   * Ionic pages and navigation.
   */

  @IonicPage()
  @Component({
    selector: 'page-login',
    templateUrl: 'login.html',
  })
  export class LoginPage {

    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
    }

    login(){
      this.navCtrl.push(HomePage);
    }

    isLoggedIn:boolean = false;
    users: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private fb: Facebook,
                public modalCtrl : ModalController,
                public menuCtrl: MenuController) {

    //desabilitar slidemenu
    this.menuCtrl.enable(true, 'menu-material');

    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if(res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

  loginFace() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  openModalRegistro(){
    var modalPage = this.modalCtrl.create('ModalcadastrousuarioPage');
    modalPage.present();
  }


  }
