import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isLoggedIn: boolean = false;

  constructor(public router: Router, public feedbackService: FeedbackService, public firebaseAuth: AngularFireAuth) { }

  public signup(credentials: { email: string, password: string }) {
    this.firebaseAuth.createUserWithEmailAndPassword(credentials.email, credentials.password).then((response) => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(response.user));
    }).catch((error) => {

    })
  }

  public login(credentials: { email: string, password: string }) {
    this.firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then((response) => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(response.user))
      this.router.navigate(['/']);
    }).catch((error) => {
      this.feedbackService.showFeedback(error.message, 'error');
    })
  }

  public async logout() {
    await this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['logout']);
  }
}
