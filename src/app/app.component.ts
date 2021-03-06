import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private availableLanguages = ['en', 'ar', 'fr'];
  public selectedLanguage;
  constructor(
    public translate: TranslateService,
    private meta: Meta,
    private titleService: Title) {
    this.translate.addLangs([...this.availableLanguages]);
    this.translate.setDefaultLang('en');
    this.selectedLanguage = localStorage.getItem('lang') ? localStorage.getItem('lang'): this.translate.getBrowserLang().match(/ar|en|fr/) ? this.translate.getBrowserLang() :'en';
  }

  ngOnInit() {
    this.changeLanguage(this.selectedLanguage);
  }

  changeLanguage(lang) {
    this.translate.use(lang);
    this.meta.updateTag({name: 'lang', content: lang});
    localStorage.setItem('lang', lang);
    this.translate.get('Language').subscribe(data => {
      this.titleService.setTitle(data);
    });
  }

  OnChangeLanguage() {
    this.changeLanguage(this.selectedLanguage);
  }
}
