import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  loader = false;
  loaderText = ""
  constructor() { }
}
