import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-half-circle-dashboard',
  templateUrl: './globalAppDash.component.html',
  styleUrls: ['./globalAppDash.component.scss']
})
export class HalfCircleDashboardComponent {
    @Input() globalAppreciation: number = 0; // The percentage of progress

    getProgressOffset(): number {
      return 440 - (440 * this.globalAppreciation) / 100;
    }
 
}
