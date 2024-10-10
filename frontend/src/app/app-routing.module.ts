import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { HomeComponent } from './pages/home/home.component';
import { ManageTaskComponent } from './pages/manage-task/manage-task.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { CreateCatalogItemComponent } from './pages/create-catalog-item/create-catalog-item.component';
import { ManageCatalogItemComponent } from './pages/manage-catalog-item/manage-catalog-item.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';
import { UpdateCatalogItemComponent } from './pages/update-catalog-item/update-catalog-item.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create_user', component: CreateUserComponent },
  { path: 'manage_user', component: ManageUserComponent },
  { path: `users/:id/edit`, component: UpdateUserComponent },
  { path: 'update_task', component: UpdateTaskComponent },
  { path: 'update_catalog_item', component: UpdateCatalogItemComponent },
  { path: 'create_task', component: CreateTaskComponent },
  { path: 'manage_task', component: ManageTaskComponent },
  { path: 'create_catalog_item', component: CreateCatalogItemComponent },
  { path: 'manage_catalog_item', component: ManageCatalogItemComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
