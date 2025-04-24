import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AvatarModule } from 'primeng/avatar';
import { ProjectionsComponent } from './features/projections/components/projections/projections.component';
import { FilmListComponent } from './features/films/components/film-list/film-list.component';
import { MenuItem } from 'primeng/api';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    // ProjectionsComponent,
    FilmListComponent,
    HeaderComponent,
    MenubarModule,
    AvatarModule,
    SidebarModule,
    PanelMenuModule,
    // RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // standalone: true,
})
export class AppComponent {
  title = 'Cine Zone';
  sidebarVisible = true;

  menuItems: MenuItem[] = [
    { label: 'Overview', icon: 'pi pi-home', routerLink: ['/overview'] },
    { label: 'Chat', icon: 'pi pi-comments' },
    { label: 'Inbox', icon: 'pi pi-inbox' },
    { label: 'Cards', icon: 'pi pi-id-card', routerLink: ['/cards'] },
    { separator: true },
    { label: 'Customers', icon: 'pi pi-users' },
    { label: 'Movies', icon: 'pi pi-ticket', routerLink: ['/movies'] }
  ];

  topMenuItems: MenuItem[] = [
    { label: 'Messages', icon: 'pi pi-envelope' },
    { label: 'Settings', icon: 'pi pi-cog' },
    { label: 'Switch Accounts', icon: 'pi pi-users' },
    { label: 'Log out', icon: 'pi pi-power-off' }
  ];
}
