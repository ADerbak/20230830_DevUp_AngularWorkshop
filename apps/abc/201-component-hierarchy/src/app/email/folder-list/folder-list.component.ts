import { Component } from '@angular/core';

import { FolderItemComponent } from '../folder-item/folder-item.component';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  standalone: true,
  imports: [FolderItemComponent]
})
export class FolderListComponent {}
