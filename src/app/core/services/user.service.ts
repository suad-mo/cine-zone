import { Injectable, signal } from '@angular/core';
import { MOCK_USERS } from '../mock/mock-user';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = MOCK_USERS; // Ovdje bi trebala biti lista korisnika
  private readonly API_URL = 'api/users'; // Replace with your actual API URL
  // Definicija User signala
  private readonly currentUser = signal<User | null>(null);

  constructor() {
      // Učitavanje trenutnog korisnika iz localStorage prilikom inicijalizacije servisa
      this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }
  // Metoda login koja postavlja trenutnog korisnika
  login(email: string, password: string): void {
    // Ovdje bi trebala biti logika za autentifikaciju korisnika
    // Na primjer, slanje zahtjeva na API i provjera korisničkih podataka
    // Ako je autentifikacija uspješna, postavi trenutnog korisnika
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      this.currentUser.set(null);
      localStorage.removeItem('currentUser');
      console.error('Invalid email or password');
    }
  }
  // Metoda logout koja uklanja trenutnog korisnika
  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }
  // computed signals
  // Metoda koja provjerava da li je korisnik prijavljen
  readonly isLoggedIn = signal(() => !!this.currentUser());
  // Metoda koja provjerava da li je korisnik admin
  readonly isAdmin = signal(() => this.currentUser()?.role === 'admin');
  // Metoda koja vraća user name
  readonly userName = signal(() => this.currentUser()?.name ?? 'Guest');
  // Metoda koja vraća trenutnog korisnika
  getCurrentUser(): User | null {
    return this.currentUser();
  }
}
