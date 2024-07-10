import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[aniParallax]',
  standalone: true,
})
export class ParallaxDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    // console.log(event);
    let bounds = this.el.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    this.el.nativeElement.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
  `;

    this.el.nativeElement.querySelector('.glow').style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      #ffffff55,
      #0000000f
    )
  `;
  }
}
