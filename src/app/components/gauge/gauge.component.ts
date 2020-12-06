import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent {
  @Input() results: any[];
  view: number[] = [500, 400];
  legend = true;
  legendPosition = 'right';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#E44D25', '#CFC0BB', '#E44D25', '#CFC0BB', '#a2e6fd', '#aed407', '#e8b277', '#1a748e', '#d38e31', '#992915', '#ab6e50']
  };

  constructor() {}

  onSelect(data): void {}

  onActivate(data): void {}

  onDeactivate(data): void {}
}



