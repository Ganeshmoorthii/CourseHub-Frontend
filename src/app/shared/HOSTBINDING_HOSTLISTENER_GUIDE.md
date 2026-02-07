# @HostBinding and @HostListener Practice Guide

## Overview
`@HostBinding` and `@HostListener` are Angular decorators used to interact with the host element of a component or directive.

---

## 1. @HostBinding
Binds a component/directive property to a property of its host element.

### Syntax
```typescript
@HostBinding('property-name') propertyName: type;
```

### Common Uses
- **CSS Classes**: `@HostBinding('class.my-class')`
- **Inline Styles**: `@HostBinding('style.backgroundColor')`
- **HTML Attributes**: `@HostBinding('attr.aria-label')`
- **DOM Properties**: `@HostBinding('disabled')`

### Example
```typescript
@Component({
  selector: 'app-button',
  template: `<button>Click me</button>`
})
export class ButtonComponent {
  @HostBinding('class.active') isActive = false;
  @HostBinding('style.opacity') opacity = '1';
  @HostBinding('attr.role') role = 'button';
}
```

---

## 2. @HostListener
Listens to events on the host element and triggers methods.

### Syntax
```typescript
@HostListener('event-name', ['$event']) methodName(event: Event): void {
  // Handle event
}
```

### Common Events
- **Mouse**: `click`, `mouseenter`, `mouseleave`, `mousemove`, `mousedown`, `mouseup`
- **Keyboard**: `keydown`, `keyup`, `keypress`, `keydown.enter`, `keydown.escape`
- **Focus**: `focus`, `blur`
- **Form**: `change`, `input`

### Example
```typescript
@Component({
  selector: 'app-button',
  template: `<button>Click me</button>`
})
export class ButtonComponent {
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    console.log('Button clicked!');
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    console.log('Mouse entered');
  }

  @HostListener('keydown.enter')
  onEnterKey(): void {
    console.log('Enter key pressed');
  }
}
```

---

## 3. Practical Examples in Your Project

### Example 1: Highlight on Hover Directive
File: `src/app/shared/directives/highlight-on-hover.directive.ts`

```typescript
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
```

**Usage in template:**
```html
<tr appHighlightOnHover highlightColor="table-active">
  <td>Data</td>
</tr>
```

---

### Example 2: Ripple Click Directive
File: `src/app/shared/directives/ripple-click.directive.ts`

```typescript
@Directive({
  selector: '[appRippleClick]',
  standalone: true
})
export class RippleClickDirective {
  @Output() rippleClicked = new EventEmitter<MouseEvent>();

  @HostBinding('class.active')
  isActive = false;

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
    // Ripple animation logic
  }
}
```

---

### Example 3: Component with HostBinding & HostListener
File: `src/app/shared/components/host-demo.component.ts`

```typescript
@Component({
  selector: 'app-host-demo',
  template: `<div>{{ mouseX }}, {{ mouseY }}</div>`
})
export class HostDemoComponent {
  // HostBinding examples
  @HostBinding('class.host-hovered')
  isHovered = false;

  @HostBinding('style.backgroundColor')
  backgroundColor: string = 'transparent';

  @HostBinding('tabindex')
  tabindex = 0;

  mouseX = 0;
  mouseY = 0;

  // HostListener examples
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
    this.backgroundColor = '#e7f3ff';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
    this.backgroundColor = 'transparent';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener('keydown.enter')
  onEnterKey(): void {
    console.log('Enter pressed');
  }
}
```

---

## 4. Key Concepts

### Property Binding with @HostBinding
```typescript
// Single class
@HostBinding('class.active') isActive = true;

// Multiple classes (use getter)
@HostBinding('class')
get classes(): string {
  return `${this.isActive ? 'active' : ''} ${this.isDisabled ? 'disabled' : ''}`;
}

// Inline styles
@HostBinding('style.color') color = 'red';
@HostBinding('style.padding.px') padding = 16;
```

### Event Parameters with $event
```typescript
// Passing the event object
@HostListener('click', ['$event'])
onClick(event: MouseEvent): void {
  console.log(event.clientX, event.clientY);
}

// Multiple parameters
@HostListener('keydown', ['$event.key'])
onKeyDown(key: string): void {
  console.log('Key pressed:', key);
}
```

### Keyboard Modifiers
```typescript
@HostListener('keydown.enter')     // Enter key
@HostListener('keydown.escape')    // Escape key
@HostListener('keydown.ctrl.s')    // Ctrl+S
@HostListener('keydown.shift.enter') // Shift+Enter
```

---

## 5. Integration in Your Project

### In UserSearchResultComponent
The table rows now have:
- **@HostBinding**: Dynamically adds CSS classes for highlighting
- **@HostListener**: Responds to hover and click events
- **Selected state tracking**: Visual feedback on selected rows

```html
<tr appHighlightOnHover 
    highlightColor="table-active"
    (click)="onRowClick(user.userName)"
    [class.selected]="selectedUserName === user.userName">
```

---

## 6. Best Practices

1. **Use Directives for Reusability**: Create directives for common host behaviors
2. **Type Safety**: Always type-annotate event parameters
3. **Performance**: Use OnDestroy to clean up subscriptions if needed
4. **Accessibility**: Bind appropriate ARIA attributes with @HostBinding
5. **CSS Transitions**: Bind transition styles for smooth effects
6. **Documentation**: Comment your @HostBinding and @HostListener decorators

---

## 7. Common Pitfalls

❌ **Don't**: Mutate complex state in @HostListener
```typescript
// Bad - side effects in listener
@HostListener('click')
onClick(): void {
  this.complexObject.nested.property = true; // Hard to track
}
```

✅ **Do**: Use dedicated methods
```typescript
// Good - clear intent
@HostListener('click')
onClick(): void {
  this.updateState();
}

private updateState(): void {
  this.isActive = true;
}
```

---

## 8. Running the Examples

1. Import the directives in your components
2. Apply them to template elements
3. Open browser DevTools to inspect the host element binding
4. Check the console for @HostListener events

---

## Additional Resources

- [Angular Official Docs: @HostBinding](https://angular.io/api/core/HostBinding)
- [Angular Official Docs: @HostListener](https://angular.io/api/core/HostListener)
- [MDN: Event handling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
