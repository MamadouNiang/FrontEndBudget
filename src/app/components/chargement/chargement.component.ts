import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChargemetService } from './chargemet.service';

@Component({
  selector: 'app-chargement',
  templateUrl: './chargement.component.html',
  styleUrls: ['./chargement.component.scss']
})
export class ChargementComponent implements OnInit {

  showSpinner = false;
  pourcentage:any;
  constructor(private spinnerService: ChargemetService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.spinnerService.getSpinnerObserver2().subscribe((status2) =>{
        this.pourcentage = (Math.round(status2));
      });
      this.cdRef.detectChanges();
    });

  }
}
