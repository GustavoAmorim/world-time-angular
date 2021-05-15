import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { map, startWith, debounceTime } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/internal/Observable';

import { WorldTimeService } from 'src/app/services/world-time/world-time.service';

@Component({
  selector: 'app-simple-world-time',
  templateUrl: './simple-world-time.component.html',
  styleUrls: ['./simple-world-time.component.scss']
})
export class SimpleWorldTimeComponent implements OnInit {

  private _timezoneAreasControl: FormControl;
  private _timezoneAreasOptions: string[];
  private _timezoneAreasFilteredOptions: Observable<string[]>;

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
      });
  }

  ngOnInit(): void {

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this._timezoneAreasOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _find(value: string): string {

    return this._timezoneAreasOptions.find(option => option === value);
  }

  get timezoneAreasFilteredOptions() {

    return this._timezoneAreasFilteredOptions;
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
