import { Component, computed, inject, Signal } from '@angular/core';
// If ToolbarModule is required, uncomment the following line and ensure the correct library is installed
import { Toolbar } from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card'; // Ensure this is the correct library for CardModule
import { UserService } from '../../../core/services/user.service';
import { CinemaService } from '../../../core/services/cinema.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  //        ToolbarModule, // Removed as it is not defined or imported
  imports: [
    CardModule, // Ensure CardModule is correctly imported and used
    Toolbar,
    ButtonModule,
    MenuModule, // Add any other necessary imports here
  ],
})
export class HeaderComponent {
  private readonly _userService = inject(UserService);
  private readonly _cinemaService = inject(CinemaService);
  private readonly router = inject(Router); // Ensure Router is correctly injected

  isLoggedIn = this._userService.isLoggedIn();
  isAdmin = this._userService.isAdmin();
  userName = this._userService.userName();

  kina = this._cinemaService.getLocations();
  selectedKino = this._cinemaService.selectedLocation();

  menuKina: MenuItem[] = [
    {
      // label: 'Sva Kina',
      // icon: 'pi pi-fw pi-map-marker',//pi-home',
      // command: () => {
      //   this._cinemaService.changeSelectedLocation(this.selectedKino.id);
      // },
      items: [
        {
          label: 'Sva Kina',
          icon: 'pi pi-fw pi-map-marker', // pi-home
          command: () => {
            if (this.selectedKino?.id) {
              this._cinemaService.changeSelectedLocation(this.selectedKino.id);
            }
          },
        },
        ...this.kina.map((kino) => ({
          label: kino.name,
          icon: 'pi pi-fw pi-map-marker',
          command: () => {
            this._cinemaService.changeSelectedLocation(kino.id);
          },
        })),
      ],
    },
  ];

  userMenuItems: Signal<MenuItem[]> = computed(() => [
    {
      label: this.isLoggedIn() ? 'Odjava' : 'Prijava',
      icon: this.isLoggedIn() ? 'pi pi-sign-out' : 'pi pi-sign-in',
      command: () => {
        if (this.isLoggedIn()) {
          this._userService.logout();
        } else {
          this._userService.login('user@test.com', 'user123');
        }
      },
    },
    {
      label: 'Moje narudžbe',
      icon: 'pi pi-shopping-cart',
      visible: this.isLoggedIn(),
    },
    {
      label: 'Profil',
      icon: 'pi pi-user',
      visible: this.isLoggedIn(),
    },
  ]);

  onFilmClick() {
    console.log('FILM button clicked');
  }

  navigateToFilms() {
    this.router.navigate(['/films']);
  }
  navigateToProjections() {
    this.router.navigate(['/projections']);
  }

  onGoHome() {
    this.router.navigate(['/home']);
  }
}
