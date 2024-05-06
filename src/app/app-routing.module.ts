import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSigninComponent } from './pages/user-signin/user-signin.component';
import { AuthGuard, PreventGuard } from './guards/auth-guard.guard';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { InputTokenComponent } from './pages/input-token/input-token.component';
import { StockMenuComponent } from './pages/stock-menu/stock-menu.component';
import { JenisMenuComponent } from './pages/jenis-menu/jenis-menu.component';
import { DataKasirComponent } from './pages/data-kasir/data-kasir.component';
import { DataMenuComponent } from './pages/data-menu/data-menu.component';
import { DataTabelComponent } from './pages/data-tabel/data-tabel.component';
import { DashboardOrderComponent } from './pages/dashboard-order/dashboard-order.component';
import { StrukComponent } from './pages/struk/struk.component';

const routes: Routes = [
  {
    path: "",
    redirectTo:"login",
    pathMatch: 'full'
  },
  {
    path: "login",
    component: UserSigninComponent,
    canActivate: [PreventGuard]
  },
  {
    path:"register",
    component:UserRegisterComponent,
    canActivate:[PreventGuard]
  },
  {
    path:"token",
    component:InputTokenComponent
  },
  {
    path: "main",
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path:"stock-menu",
    component:StockMenuComponent,
    canActivate: [AuthGuard],
    children:[
      {path:'jenis-menu',component: JenisMenuComponent},
      {path:'data-kasir',component: DataKasirComponent},
      {path: 'jenis-menu/:id', component: DataMenuComponent },
      {path:'data-tabel',component:DataTabelComponent}
    ]
  },
  {
    path:"dashboard-order",
    component:DashboardOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path:"struk",
    component:StrukComponent,
    canActivate:[ AuthGuard ],
  },
  {
    path: "**", component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
