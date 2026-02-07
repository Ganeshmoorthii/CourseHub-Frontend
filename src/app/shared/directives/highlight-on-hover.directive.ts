import { Directive, HostBinding, HostListener, Input } from '@angular/core';

/**
 * Directive to highlight elements on hover
 * Example usage: <tr appHighlightOnHover highlightColor="bg-light">
 */
@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true
})
export class HighlightOnHoverDirective {
  @Input() highlightColor: string = 'bg-light';

  @HostBinding('class')
  get classes(): string {
    return this.isHovered ? this.highlightColor : '';
  }

  @HostBinding('style.cursor')
  cursor: string = 'pointer';

  @HostBinding('style.transition')
  transition: string = 'background-color 0.3s ease';

  private isHovered = false;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
  }
}
