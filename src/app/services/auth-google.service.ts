import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = 'http://localhost:8080';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private authWindow: Window | null = null;
  private authCheckInterval: any = null;

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  login(data: any) {
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${this.baseUrl}/api/login`, data, {
      headers: this.headers,
    });
    // .pipe(tap((response: any) => {
    //   localStorage.setItem('token', response.token);
    // }));
  }

  register(data: any) {
    this.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${this.baseUrl}/api/register`, data, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post(
      'https://jsonplaceholder.typicode.com/posts',
      JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      {
        headers: {
          'content-type': 'application/json',
        },
        // withCredentials: true,
      }
    );
  }

  googleLogin() {
    // window.location.href =
    //   'http://localhost:8080/social/login?redirect=http://localhost:8080/pages';
  }

  openSignInWindow(url: string, name: string) {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    this.authWindow = window.open(
      url,
      name,
      `width=${width},height=${height},top=${top},left=${left}`
    );

    window.addEventListener('message', this.receiveMessage.bind(this), false);

    // Check if the window is closed manually
    this.authCheckInterval = setInterval(() => {
      if (this.authWindow && this.authWindow.closed) {
        this.ngZone.run(() => this.handleWindowClose());
      }
    }, 1000);
  }

  receiveMessage(event: MessageEvent) {
    if (event.origin !== window.location.origin) {
      return;
    }

    const { token } = event.data;
    if (token) {
      this.handleAuthToken(token);
    }
  }

  handleAuthToken(token: string) {
    // Handle the received token (e.g., store it, make authenticated requests, etc.)
    console.log('Received token:', token);
    if (this.authWindow) {
      this.authWindow.close();
    }
  }

  handleWindowClose() {
    console.log('Auth window closed manually');
    if (this.authCheckInterval) {
      clearInterval(this.authCheckInterval);
    }
    // Handle manual window close event (e.g., notify the user, retry login, etc.)
  }
}
