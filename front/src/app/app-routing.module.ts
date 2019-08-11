import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductsComponent } from './pages/products/products.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { ChatComponent } from './pages/chat/chat.component';
import { TrackorderComponent } from './pages/trackorder/trackorder.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'category/:cname',component:CategoryComponent},
{path:'product/:id',component:ProductsComponent},
{path:'feedback',component:FeedbackComponent},
{path:'cart',component:CartComponent},
{path:'header',component:HeaderComponent},
{path:'profile',component:ProfileComponent},
{path:'search',component:SearchComponent},
{path:'chat',component:ChatComponent},
{path:'trackorder',component:TrackorderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
