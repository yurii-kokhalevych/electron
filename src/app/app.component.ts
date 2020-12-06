import { Component, OnInit } from '@angular/core';
import { BackendApiService } from './services/backend-api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private apiService: BackendApiService,  private ngxLoader: NgxUiLoaderService) {}
  folder: string;
  loader: boolean;

  ngOnInit(): void {}
  selectDir = async () => {
    this.folder = (await api.openDialog()).filePaths[0];
    this.loader = true;
    this.ngxLoader.start();
    const res = await api.sendToMain('readFolder',  this.folder);
    this.apiService.currentTreeSubject.next(res);
    this.loader = false;
    this.ngxLoader.stop();
  }

  getValue = () => this.apiService.currentTreeSubject.getValue();
}
