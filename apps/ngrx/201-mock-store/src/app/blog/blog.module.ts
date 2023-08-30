import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UIDisplayOrEditModule } from '@class-materials/shared/ui-display-or-edit';

import { userIdRouteParam } from '../routing-parameters';

import { PostComponent } from './post/post.component';
import { PostEffects } from './post/post.effects';
import * as fromPost from './post/post.reducer';
import { PostListComponent } from './post-list/post-list.component';
import { UserComponent } from './user/user.component';
import { UserEffects } from './user/user.effects';
import * as fromUser from './user/user.reducer';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: `:${userIdRouteParam}`,
    component: UserComponent
  }
];

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    UIDisplayOrEditModule,
    StoreModule.forFeature(fromUser.userFeature),
    StoreModule.forFeature(fromPost.postFeature),
    EffectsModule.forFeature([PostEffects, UserEffects])
  ]
})
export class BlogModule {}
