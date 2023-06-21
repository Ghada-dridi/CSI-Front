import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-half-circle-dashboard',
  templateUrl: './globalAppDash.component.html',
  styleUrls: ['./globalAppDash.component.scss']
})
export class HalfCircleDashboardComponent {
  @Input() globalAppreciation: number = 0; // The percentage of progress

  getProgressOffset(): number {
    return (440 * (100 - this.globalAppreciation)) / 100;
  }

  getStrokeColor(): string {
    if (this.globalAppreciation < 30) {
      return 'red';
    } else if (this.globalAppreciation >= 30 && this.globalAppreciation <= 50) {
      return 'orange';
    } else {
      return 'green';
    }
  }
}
