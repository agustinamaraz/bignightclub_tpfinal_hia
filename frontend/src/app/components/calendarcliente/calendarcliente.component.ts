import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GooService } from 'src/app/services/goo.service';

@Component({
  selector: 'app-calendarcliente',
  templateUrl: './calendarcliente.component.html',
  styleUrls: ['./calendarcliente.component.css']
})
export class CalendarclienteComponent implements OnInit {
  calendarioGoogle: any = null;
  idCalendario: string = 'a2240f8dc916721874235dcab6ef8783ac658708a70e722f95bede9c8c979422@group.calendar.google.com';

  constructor(private gooService: GooService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  
  verEventos() {
    //idCalendario: String;
    this.gooService.getEvents(this.idCalendario).subscribe(
      (result) => {
        this.calendarioGoogle = result;
        alert(JSON.stringify(this.calendarioGoogle));
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
