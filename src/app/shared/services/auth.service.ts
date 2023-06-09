import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FeedbackService } from './feedback.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public authState!: firebase.default.User | null;

  constructor(public router: Router, public feedbackService: FeedbackService, public loaderService: LoaderService, public firebaseAuth: AngularFireAuth) { }

  public signup(credentials: { email: string, password: string }) {
    this.firebaseAuth.createUserWithEmailAndPassword(credentials.email, credentials.password).then((response) => {
      this.authState = response.user;
      sessionStorage.setItem('user', JSON.stringify(response.user?.uid));
    })
  }

  public login(credentials: { email: string, password: string }) {
    this.loaderService.open();

    this.firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then((response) => {
      this.authState = response.user;
      sessionStorage.setItem('user', JSON.stringify(response.user?.uid))
      this.loaderService.close();
      this.router.navigate(['/']);
    }).catch((error) => {
      this.authState = null;
      this.feedbackService.showFeedback(error.message, 'error');
    }).finally(() => {
      this.loaderService.close();
    })
  }

  public async logout() {
    this.loaderService.open();
    await this.firebaseAuth.signOut();
    this.authState = null;
    sessionStorage.removeItem('user');
    this.loaderService.close();
    this.router.navigate(['login']);
  }

  public isLoggedIn() {
    return sessionStorage.getItem('user') || this.authState?.uid ? true : null;
  }
}
