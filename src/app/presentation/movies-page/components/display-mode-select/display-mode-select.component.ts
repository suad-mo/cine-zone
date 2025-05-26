// presentation/components/mode-select.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  input,
  computed,
  inject,
} from '@angular/core';
import { DisplayMode } from '../../../../core/entities/display-mode.entity';
import { Select, SelectChangeEvent } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoviesState } from '../../../../infrastructure/states/movies.state';
// import { DisplayMode } from '../../core/entities/mode.entity';

@Component({
  standalone: true,
  selector: 'app-mode-select',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './display-mode-select.component.html',
  styleUrls: ['./display-mode-select.component.scss'],
})
export class ModeSelectComponent {
  modes = input<DisplayMode[]>([]);
  selectedId = inject(MoviesState).selectedIdMode;// input<string | null>(null);
  disabled = input<boolean>(false);
  @Output() selectedChange = new EventEmitter<string>();

  listMode = computed(() => {
    return this.modes().map((mode) => ({
      label: mode.name,
      value: mode.id,
    }));
  });
}
