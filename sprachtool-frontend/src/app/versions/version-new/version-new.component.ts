import { VersionService } from '../version.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-version-new',
  templateUrl: './version-new.component.html',
  styleUrls: ['./version-new.component.scss']
})
export class VersionNewComponent {

  constructor(private versionService: VersionService) { }

  @ViewChild('versionForm') form;

  newVersion(form) {
      this.versionService.newVersion(form.form.value);
      this.form.resetForm();
  }

}
