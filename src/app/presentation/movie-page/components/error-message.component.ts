// shared/components/error-message.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-error-message',
  template: `
    <div class="error-container" role="alert">
      <div class="error-content">
        <svg class="icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M11,7V13H13V7H11M11,15V17H13V15H11Z"/>
        </svg>
        <div class="message">{{error?.message || 'An error occurred'}}</div>
      </div>
      @if (showRetry) {
        <button class="retry-button" (click)="retry.emit()">
          Try Again
        </button>
      }
    </div>
  `,
  styles: [
    `
      .error-container {
        padding: 1rem;
        background: #ffeeee;
        border: 1px solid #ffcccc;
        border-radius: 4px;
        color: #cc0000;
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      .error-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
      }

      .message {
        font-size: 0.9rem;
      }

      .retry-button {
        padding: 0.25rem 0.75rem;
        background: #ffdddd;
        border: 1px solid #ffcccc;
        border-radius: 4px;
        color: #cc0000;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: #ffcccc;
        }
      }
    `
  ]
})
export class ErrorMessageComponent {
  @Input() error?: Error | null;
  @Input() showRetry = false;
  @Output() retry = new EventEmitter<void>();
}
