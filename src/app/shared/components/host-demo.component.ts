import { Component, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component demonstrating @HostBinding and @HostListener
 * Shows how to control component's host element properties and listen to events
 */
@Component({
  selector: 'app-host-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-container">
      <h4>@HostBinding & @HostListener Demo</h4>
      
      <div class="info-box">
        <p><strong>Host Element State:</strong></p>
        <ul>
          <li>Is Hovered: {{ isHovered }}</li>
          <li>Is Focused: {{ isFocused }}</li>
          <li>Mouse Position: X={{ mouseX }}, Y={{ mouseY }}</li>
          <li>Click Count: {{ clickCount }}</li>
        </ul>
      </div>

      <div class="button-group">
        <button (click)="resetCounter()">Reset Counter</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .demo-container {
      font-family: Arial, sans-serif;
    }

    .info-box {
      background: #f5f5f5;
      padding: 12px;
      border-radius: 4px;
      margin: 12px 0;
    }

    .button-group {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }

    button {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }
  `]
})
export class HostDemoComponent {
  // @HostBinding examples
  @HostBinding('class.host-hovered')
  isHovered = false;

  @HostBinding('class.host-focused')
  isFocused = false;

  @HostBinding('style.backgroundColor')
  backgroundColor: string = 'transparent';

  @HostBinding('style.borderLeft')
  borderLeft: string = '4px solid transparent';

  @HostBinding('tabindex')
  tabindex = 0;

  // Component properties
  mouseX = 0;
  mouseY = 0;
  clickCount = 0;

  // @HostListener examples
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
    this.backgroundColor = '#e7f3ff';
    this.borderLeft = '4px solid #007bff';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
    this.backgroundColor = 'transparent';
    this.borderLeft = '4px solid transparent';
  }

  @HostListener('focus')
  onFocus(): void {
    this.isFocused = true;
    this.backgroundColor = '#f0f0f0';
  }

  @HostListener('blur')
  onBlur(): void {
    this.isFocused = false;
    if (!this.isHovered) {
      this.backgroundColor = 'transparent';
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.clickCount++;
    console.log(`Component clicked! Total clicks: ${this.clickCount}`);
  }

  // Keyboard support
  @HostListener('keydown.enter')
  onEnterKey(): void {
    console.log('Enter key pressed on component');
  }

  resetCounter(): void {
    this.clickCount = 0;
  }
}
