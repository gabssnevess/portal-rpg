import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  private popStateHandler: any;
  constructor(
    private alertCtrl: AlertController,
    private supabase: SupabaseService,
    private router: Router
  ) { }
  async ngOnInit() {
    await this.LoadSistemas();
    this.SetupBackButtonLogoutHandler();
  }
  ngOnDestroy() {
    if (this.popStateHandler) {
      window.removeEventListener('popstate', this.popStateHandler);
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

  // --------------------
  // Logout when click on the arrow button
  // --------------------
  SetupBackButtonLogoutHandler() {
    // Evita múltiplos disparos
    let isHandlingPopState = false;
    // Primeira entrada falsa no histórico
    history.pushState(null, '', location.href);
    this.popStateHandler = async () => {
      if (isHandlingPopState) return;
      isHandlingPopState = true;

      const alert = await this.alertCtrl.create({
        header: 'Sair?',
        message: 'Se você voltar, será deslogado. Deseja continuar?',
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              return;
            },
          },
          {
            text: 'Sim, sair',
            handler: async () => {
              await this.supabase.SignOut();
              this.router.navigate(['/login']);
              isHandlingPopState = false;
            },
          },
        ],
      });

      await alert.present();
    };
    window.addEventListener('popstate', this.popStateHandler);
  }

  // --------------------
  // Change screen
  // --------------------
  ChangeScreen(param: string) {
    switch (param) {
      case "home":
        this.router.navigate(['home']);
        break;
      case "campanhas":
        this.router.navigate(['campanhas']);
        break;
    }
  }

  sistemas: any[] = [];
  async LoadSistemas() {
    const { data, error } = await this.supabase.GetSistemas();
    if (error) {
      console.error('Deu bosta', error);
    } else {
      this.sistemas = data;
    }
  }
}