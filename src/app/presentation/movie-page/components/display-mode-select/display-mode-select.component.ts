// presentation/components/mode-select.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DisplayMode } from '../../../../core/entities/display-mode.entity';
import { SelectChangeEvent } from 'primeng/select';
// import { DisplayMode } from '../../core/entities/mode.entity';

@Component({
  standalone: true,
  selector: 'app-mode-select',
  templateUrl: './display-mode-select.component.html',
  styleUrls: ['./display-mode-select.component.scss'],
  // template: `
  //   <select
  //     [value]="selectedId"
  //     (change)="onSelect($event)"
  //     [disabled]="disabled"
  //   >
  //     <option value="" disabled>Select Mode</option>
  //     @for (mode of modes; track mode.id) {
  //     <option [value]="mode.id">{{ mode.name }}</option>
  //     }
  //   </select>
  // `,
  // styles: [
  //   `
  //     select {
  //       width: 100%;
  //       padding: 0.5rem;
  //       border: 1px solid #ccc;
  //       border-radius: 4px;
  //       font-size: 1rem;
  //     }
  //   `,
  // ],
})
export class ModeSelectComponent {
  @Input() modes: DisplayMode[] = [];
  @Input() selectedId: string | null = null;
  @Input() disabled = false;
  @Output() selectedChange = new EventEmitter<DisplayMode>();

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const mode = this.modes.find((m) => m.id === selectedValue);
    if (mode) this.selectedChange.emit(mode);
  }
}
