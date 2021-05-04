import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadWalletComponent } from './subcomponents/upload-wallet/upload-wallet.component';
import { PlayerGenComponent } from './subcomponents/player-gen/player-gen.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadWalletComponent,
    PlayerGenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
