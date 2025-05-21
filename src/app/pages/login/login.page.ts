import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
  providers: [SupabaseService]
})
export class LoginPage implements OnInit {
  // General Variables
  private popStateHandler: any;

  constructor(
    private supabase : SupabaseService,
    private router   : Router,
    private alertCtrl: AlertController,
    private location: Location
  ) {}
  ngOnInit() {}

  // --------------------
  // Login
  // --------------------
  email: string = "";
  password: string = "";
  async Login() {
    const {error} = await this.supabase.SignIn(this.email, this.password);
    if (error) {
      this.ShowAlert("Erro ao realizar login!", error.message);
    } else {
      this.router.navigate(['home']);
    }
  }

  // --------------------
  // Showing alerts
  // --------------------
  async ShowAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['Ok'],
      cssClass: 'custom-alert',
    });
    await alert.present();
  }
}