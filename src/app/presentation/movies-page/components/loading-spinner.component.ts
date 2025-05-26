// shared/components/loading-spinner.component.ts
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  template: `
    <div class="spinner" [class]="size">
      <div class="dot1"></div>
      <div class="dot2"></div>
    </div>
  `,
  styles: [
    `
      .spinner {
        position: relative;
        margin: auto;
      }

      .spinner.small {
        width: 20px;
        height: 20px;
      }

      .spinner.medium {
        width: 40px;
        height: 40px;
      }

      .spinner.large {
        width: 60px;
        height: 60px;
      }

      .dot1, .dot2 {
        width: 60%;
        height: 60%;
        display: inline-block;
        position: absolute;
        top: 0;
        background-color: #333;
        border-radius: 50%;
        animation: sk-bounce 2.0s infinite ease-in-out;
      }

      .dot2 {
        top: auto;
        bottom: 0;
        animation-delay: -1.0s;
      }

      @keyframes sk-bounce {
        0%, 100% {
          transform: scale(0.0);
        } 50% {
          transform: scale(1.0);
        }
      }
    `
  ]
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
