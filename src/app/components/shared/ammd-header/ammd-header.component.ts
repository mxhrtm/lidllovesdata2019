import {
    Component,
    OnInit
  } from "@angular/core";
  
  @Component({
    selector: "ammd-header",
    styleUrls: ["./ammd-header.component.scss"],
    template:`
    <div class="ammd-header">
        <img src="../../../../assets/img/heraeus_white.png" alt="Heraeus Logo">
        <span><ng-content></ng-content></span>
    </div>
    `
  })
  export class AmmdHeaderComponent implements OnInit { 
    constructor() {}
  
    ngOnInit(): void {}
  }
  