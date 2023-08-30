import { Component } from '@angular/core';
import {
  RouterLinkActive,
  RouterLink,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-payroll-screen',
  templateUrl: './payroll-screen.component.html',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet]
})
export class PayrollScreenComponent {}
