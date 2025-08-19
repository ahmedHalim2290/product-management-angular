import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ConfirmDialogModule,
    ToastModule,
    MenubarModule,
  ],
    providers: [ConfirmationService, MessageService], // Add these providers
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('product-management-angular');

  items: MenuItem[] = [];

  ngOnInit() {
    this.setupMenu();
  }

  private setupMenu() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/']
      },
      {
        label: 'Products',
        icon: 'pi pi-box',
        routerLink: ['/products']
      },
      {
        label: 'Suppliers',
        icon: 'pi pi-building',
        routerLink: ['/suppliers']
      }
    ];
  }
}
