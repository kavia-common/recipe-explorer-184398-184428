import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // PUBLIC_INTERFACE
  @Output() searchChange = new EventEmitter<string>();

  query = signal('');

  onInput(val: string) {
    this.query.set(val);
    this.searchChange.emit(val);
  }

  clearSearch() {
    this.query.set('');
    this.searchChange.emit('');
  }
}
