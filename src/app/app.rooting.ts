import { Routes, RouterModule } from '@angular/router'

import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { HomeComponent } from './userSpace/home.component';
import { LoginComponent } from './user/login/login.component';
import { FileComponent } from './file/file.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';




import { AuthGuard } from './user/login/_guards/auth.guard';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'create-user', component: CreateUserComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'update-user', component: UpdateUserComponent },
    { path: 'app-my-files', component: FileComponent }, 
    { path: 'app-root', component: AppComponent }, 

    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
     { path: '**', redirectTo: 'welcome' }
];

export const routing = RouterModule.forRoot(appRoutes);

