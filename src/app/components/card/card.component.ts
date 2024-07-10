import { CommonModule } from '@angular/common';
import { Component, ElementRef, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ParallaxDirective } from '../../directives/animation/parallax.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, ParallaxDirective,MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  animateCard = input<boolean>(false);

  constructor(private elementRef: ElementRef) {}

  onMouseMove(event: MouseEvent) {
    // console.log(this.elementRef);
    if (this.animateCard()) {
      // let bounds = this.elementRef.nativeElement.getBoundingClientRect();
      // const mouseX = event.clientX;
      // const mouseY = event.clientY;
      // const middleX = window.innerWidth / 2;
      // const middleY = window.innerHeight / 2;
      // const offsetX = ((event.clientX - middleX) / middleX) * 45;
      // const offsetY = ((event.clientY - middleY) / middleY) * 35;

      // this.elementRef.nativeElement.style.setProperty("--rotateX", -1 * offsetY + "deg");
      // this.elementRef.nativeElement.style.setProperty("--rotateY",offsetX + "deg");
      // this.elementRef.nativeElement.style.transform = "scale(1.05)";
  //     this.elementRef.nativeElement.style.transform = `
  //   scale3d(1.07, 1.07, 1.07)
  //   rotate3d(
  //     ${center.y / 100},
  //     ${-center.x / 100},
  //     0,
  //     ${Math.log(distance) * 2}deg
  //   )
  // `;
    }
  }

  onMouseOut(){
    this.elementRef.nativeElement.style.setProperty("--rotateX",0 + "deg");
    this.elementRef.nativeElement.style.setProperty("--rotateY",0 + "deg");
  }
}
