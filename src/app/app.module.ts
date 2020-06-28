import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { WorkflowsComponent } from './workflows/workflows.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NewWorkflowComponent } from './new-workflow/new-workflow.component';
import { formBottomSheet } from './new-workflow/new-workflow.component';
import {MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS} from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [
    AppComponent,
    WorkflowsComponent,
    LoginComponent,
    NewWorkflowComponent,
    formBottomSheet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatBottomSheetModule,
    
  ],
  providers: [ {
    provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
    useValue: {hasBackdrop: true}
    }],
  bootstrap: [AppComponent],
  entryComponents:[formBottomSheet]
})
export class AppModule { }
