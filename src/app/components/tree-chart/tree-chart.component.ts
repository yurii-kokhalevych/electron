import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { TreeviewItem, TreeviewComponent, DownlineTreeviewItem, TreeviewConfig, TreeviewEventParser, OrderDownlineTreeviewEventParser } from 'ngx-treeview';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class ChartTreeviewConfig extends TreeviewConfig {
  hasAllCheckBox = false;
  hasFilter = true;
  hasCollapseExpand = false;
  maxHeight = 400;
}

@Component({
  selector: 'app-tree-chart',
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.scss'],
  providers: [
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
    { provide: TreeviewConfig, useClass: ChartTreeviewConfig }
  ]
})

export class TreeChartComponent implements OnInit {
  @ViewChild(TreeviewComponent, { static: false }) treeviewComponent: TreeviewComponent;
  items: TreeviewItem[];
  rows = [];
  checked = [];
  public radioGroupForm: FormGroup;

  constructor(private service: BackendApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.items = this.service.getList();
    this.radioGroupForm = this.formBuilder.group({
      model: 'pie'
    });
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]): void {
    const selectedNodes = {};
    downlineItems.forEach(downlineItem => {
      let parent = downlineItem.parent;
      while (parent?.item?.checked) {
        if (!parent.parent?.item?.checked) {
          break;
        }
        parent = parent.parent;
      }
      (parent?.item?.children
        ?.filter(x => x.checked) || [])
        .forEach(x => { selectedNodes[x.value.id] = { name: x.text, value: x.value.size }; });
    });
    this.rows = Object.values(selectedNodes);
  }
}
