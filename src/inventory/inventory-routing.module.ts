import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtractionsComponent } from './departments/extractions/extractions.component';
import { MassSpecComponent } from './departments/mass-spec/mass-spec.component';
import { QualityComponent } from './departments/quality/quality.component';
import { RdComponent } from './departments/rd/rd.component';
import { ReceivingComponent } from './departments/receiving/receiving.component';
import { ScreeningComponent } from './departments/screening/screening.component';
import { ShippingComponent } from './admin/shipping/shipping.component';
import { MasterComponent } from './admin/master/master.component';
import { StoreRoomComponent } from './admin/store-room/store-room.component';
import { GeneralRequestComponent } from './departments/requests/general-request/general-request.component';
import { StoreRoomRequestComponent } from './departments/requests/store-room-request/store-room-request.component';
import { OfficeSupplyRequestComponent } from './departments/requests/office-supply-request/office-supply-request.component';
import { GeneralRequestViewComponent } from './admin/requests/admin-general-request/general-request-view/general-request-view.component';
import { StoreRoomRequestViewComponent } from './admin/requests/admin-store-room-request/store-room-request-view/store-room-request-view.component';
import { OfficeSupplyRequestViewComponent } from './admin/requests/admin-office-supply-request/office-supply-request-view/office-supply-request-view.component';
import { AdminGeneralRequestComponent } from './admin/requests/admin-general-request/admin-general-request.component';
import { AdminStoreRoomRequestComponent } from './admin/requests/admin-store-room-request/admin-store-room-request.component';
import { AdminOfficeSupplyRequestComponent } from './admin/requests/admin-office-supply-request/admin-office-supply-request.component';
import { AuthComponent } from './auth/auth.component';
import { SignInFormComponent } from './shared/shared-components/forms/signin-form/signin-form.component';
import { AuthGuard } from './auth/auth.guard';
import { ChemicalsComponent } from './departments/chemicals/chemicals.component';
import { BreakroomRequestComponent } from './departments/requests/breakroom-request/breakroom-request.component';
import { AdminBreakroomRequestComponent } from './admin/requests/admin-breakroom-request/admin-breakroom-request.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'sign-in', component: SignInFormComponent }
    ]
  },


  { path: 'master', component: MasterComponent, canActivate: [AuthGuard]  },
  { path: 'store-room', component: StoreRoomComponent, canActivate: [AuthGuard]  },
  { path: 'shipping', component: ShippingComponent, canActivate: [AuthGuard]  },

  { path: 'admin-general-request', component: AdminGeneralRequestComponent, canActivate: [AuthGuard]  },
  { path: 'admin-store-room-request', component: AdminStoreRoomRequestComponent, canActivate: [AuthGuard]  },
  { path: 'admin-breakroom-request', component: AdminBreakroomRequestComponent, canActivate: [AuthGuard]  },
  { path: 'admin-office-supply-request', component: AdminOfficeSupplyRequestComponent, canActivate: [AuthGuard]  },

  { path: 'general-request', component: GeneralRequestComponent, canActivate: [AuthGuard]  },
  { path: 'store-room-request', component: StoreRoomRequestComponent, canActivate: [AuthGuard]  },
  { path: 'breakroom-request', component: BreakroomRequestComponent, canActivate:  [AuthGuard]  },
  { path: 'office-supply-request', component: OfficeSupplyRequestComponent, canActivate: [AuthGuard]  },

  { path: 'extractions', component: ExtractionsComponent, canActivate: [AuthGuard]  },
  { path: 'mass-spec', component: MassSpecComponent, canActivate: [AuthGuard]  },
  { path: 'receiving', component: ReceivingComponent, canActivate: [AuthGuard]  },
  { path: 'r&d', component: RdComponent, canActivate: [AuthGuard]  },
  { path: 'screening', component: ScreeningComponent, canActivate: [AuthGuard]  },
  { path: 'quality', component: QualityComponent, canActivate: [AuthGuard]  },
  { path: 'chemicals', component: ChemicalsComponent, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '/auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
