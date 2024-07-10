import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';


@Component({
  selector: 'avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  shape = input<string>();
  size = input<string>();
}
