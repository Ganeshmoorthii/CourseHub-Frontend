import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

/**
 * Directive to add click ripple effect
 * Example usage: <button appRippleClick (rippleClicked)="handleClick()">Click me</button>
 */
@Directive({
  selector: '[appRippleClick]',
  standalone: true
})
export class RippleClickDirective {
  @Output() rippleClicked = new EventEmitter<MouseEvent>();

  @HostBinding('class.active')
  isActive = false;

  @HostBinding('style.position')
  position: string = 'relative';

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.createRipple(event);
    this.rippleClicked.emit(event);
  }

  @HostListener('mousedown')
  onMouseDown(): void {
    this.isActive = true;
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseUp(): void {
    this.isActive = false;
  }

  private createRipple(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const ripple = document.createElement('span');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
}
