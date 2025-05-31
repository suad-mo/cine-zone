import { computed, Injectable, signal } from '@angular/core';
import { GetDisplayModesUseCase } from '../../core/use-cases/get-display-modes.use-case';
import { DisplayMode } from '../../core/entities/display-mode.entity';

@Injectable({
  providedIn: 'root',
})
export class CategoriesState {
  private _isLoadedCategories = signal<boolean>(false);
  private _displayModes = signal<DisplayMode[]>([]);
  private _selectedCategory = signal<string | null>('new');
  private _loading = signal<boolean>(false);
  private _error = signal<Error | null>(null);

  selectedDisplayMode = computed(() => {
    return (
      this._displayModes().find(
        (mode) => mode.id === this._selectedCategory()
      ) || null
    );
  });

  listCategories = computed(() => {
    return this._displayModes().map((mode) => ({
      label: mode.name,
      value: mode.id,
    }));
  });

  readonly displayModes = this._displayModes.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private getDispayModeUseCase: GetDisplayModesUseCase) {
    this._loadCategories();
  }

  async _loadCategories(): Promise<void> {
    try {
      if (this._isLoadedCategories()) {
        return; // Categories already loaded
      }
      this._loading.set(true);
      const displayModes = await this.getDispayModeUseCase.execute();
      this._displayModes.set(displayModes);
      this._isLoadedCategories.set(true);
    } catch (error) {
      this._error.set(error as Error);
      console.error('Error loading display modes - categories:', error);
    } finally {
      this._loading.set(false);
    }
  }

  get selectedCategory(): string {
    return this._selectedCategory() || 'new';
  }

  set selectedCategory(id: string | null) {
    this._selectedCategory.set(id || 'new');
  }
}
