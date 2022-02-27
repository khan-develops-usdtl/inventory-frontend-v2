import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { InventoryModule } from './inventory/inventory.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(InventoryModule)
  .catch(err => console.error(err));
