import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { map, startWith, debounceTime } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/internal/Observable';

import { WorldTimeService } from 'src/app/services/world-time/world-time.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-simple-world-time',
  templateUrl: './simple-world-time.component.html',
  styleUrls: ['./simple-world-time.component.scss']
})
export class SimpleWorldTimeComponent implements OnInit {

  readonly DATETIME_LOCALE = 'pt';
  readonly DATETIME_PIPE_MASK ='mediumTime';

  private _timeSelected;
  private _datePipe: DatePipe;

  private _timezoneAreasControl: FormControl;
  private _timezoneAreasOptions: any[];
  private _timezoneAreasFilteredOptions: Observable<any[]>;

  constructor(private worldtimeService: WorldTimeService) {

    this._timezoneAreasControl = new FormControl();

    this._timezoneAreasOptions = [];

    this._timezoneAreasFilteredOptions = this._timezoneAreasControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        map(value => this._filter(value))
      );

    this.worldtimeService.getTimezones()
      .toPromise()
        .then(listTiemzone => {

          this._timezoneAreasOptions = listTiemzone;
          // console.log(this._timezoneAreasOptions);
        }).catch(error => {

          console.log(error);
        });
  }

  ngOnInit(): void {

    this._datePipe = new DatePipe(this.DATETIME_LOCALE);
  }

  public onClickGetTime() {

    if (this.timeSelected && this.timeSelected.GMT) {

    const today = new Date();
    this._timeSelected['timeValue'] = this.datePipe.transform(today, this.DATETIME_PIPE_MASK, 'GMT' + this.timeSelected.GMT);

/* USING API
      this.worldtimeService.getCurrentTimeLocation(this.timezoneAreasControl.value)
        .toPromise()
          .then(time => {

            // this._timezoneAreasOptions = listTiemzone;
            this._timeSelected = time;
            console.log(time);

            console.log(time.abbreviation)
            console.log(time.utc_datetime)
            console.log(time.day_of_week)
            console.log(time.datetime)

          }).catch(error => {

            console.log(error);
            this.clearTimeSelected();
          });
*/
    }
  }

  private _filter(value: string): any[] {

    if (value) {

      const filterValue = value.toLowerCase();

      return this._timezoneAreasOptions.filter(option => option.timezone.toLowerCase().includes(filterValue));
    } else {

      return this._timezoneAreasOptions;
    }
  }

  private _find(value: string): string {

    const item = this._timezoneAreasOptions.find(option => option.timezone === value);

    if (item) {
      this._timeSelected = item;
    }

    return item;
  }

  get timezoneAreasFilteredOptions() {

    return this._timezoneAreasFilteredOptions;
  }

  public clearTimeSelected() {
    this._timeSelected = null;
  }

  get datePipe(): DatePipe {

    return this._datePipe;
  }

  get timeSelected() {

    return this._timeSelected;
  }

  get timezoneAreasControl() {

    return this._timezoneAreasControl;
  }

  get isDisableButton(): boolean {

    if (!this.timezoneAreasControl.value
        || (this.timezoneAreasControl.value && !this._find(this.timezoneAreasControl.value))) {
      return true;
    }

    return false;
  }
}
