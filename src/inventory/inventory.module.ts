import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { AgGridModule } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './shared/store/search/search.reducer';
import { ExtractionsComponent } from './departments/extractions/extractions.component';
import { MasterComponent } from './admin/master/master.component';
import { NavbarComponent } from './shared/shared-components/navbar/navbar.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { BottomToolbarComponent } from './shared/shared-components/navbar/bottom-toolbar/bottom-toolbar.component';
import { SnackbarComponent } from './shared/shared-components/snackbar/snackbar.component';
import { ExtractionsQuantityRendererComponent } from './departments/extractions/extractions-quantity-renderer/extractions-quantity-renderer.component';
import { ExtractionsCategoryRendererComponent } from './departments/extractions/extractions-category-renderer/extractions-category-renderer.component';
import { ExtractionsCategoryFilterComponent } from './departments/extractions/extractions-category-filter/extractions-category-filter.component';
import { MassSpecComponent } from './departments/mass-spec/mass-spec.component';
import { ExtractionsDetailsComponent } from './departments/extractions/extractions-details/extractions-details.component';
import { MassSpecCategoryFilterComponent } from './departments/mass-spec/mass-spec-category-filter/mass-spec-category-filter.component';
import { MassSpecCategoryRendererComponent } from './departments/mass-spec/mass-spec-category-renderer/mass-spec-category-renderer.component';
import { MassSpecQuantityRendererComponent } from './departments/mass-spec/mass-spec-quantity-renderer/mass-spec-quantity-renderer.component';
import { MassSpecDetailsComponent } from './departments/mass-spec/mass-spec-details/mass-spec-details.component';
import { ReceivingComponent } from './departments/receiving/receiving.component';
import { ReceivingCategoryFilterComponent } from './departments/receiving/receiving-category-filter/receiving-category-filter.component';
import { ReceivingCategoryRendererComponent } from './departments/receiving/receiving-category-renderer/receiving-category-renderer.component';
import { ReceivingDetailsComponent } from './departments/receiving/receiving-details/receiving-details.component';
import { ReceivingQuantityRendererComponent } from './departments/receiving/receiving-quantity-renderer/receiving-quantity-renderer.component';
import { RdComponent } from './departments/rd/rd.component';
import { RdDetailsComponent } from './departments/rd/rd-details/rd-details.component';
import { RdQuantityRendererComponent } from './departments/rd/rd-quantity-renderer/rd-quantity-renderer.component';
import { RdCategoryFilterComponent } from './departments/rd/rd-category-filter/rd-category-filter.component';
import { RdCategoryRendererComponent } from './departments/rd/rd-category-renderer/rd-category-renderer.component';
import { ScreeningComponent } from './departments/screening/screening.component';
import { ScreeningQuantityRendererComponent } from './departments/screening/screening-quantity-renderer/screening-quantity-renderer.component';
import { ScreeningCategoryRendererComponent } from './departments/screening/screening-category-renderer/screening-category-renderer.component';
import { ScreeningCategoryFilterComponent } from './departments/screening/screening-category-filter/screening-category-filter.component';
import { ScreeningDetailsComponent } from './departments/screening/screening-details/screening-details.component';
import { QualityComponent } from './departments/quality/quality.component';
import { QualityCategoryRendererComponent } from './departments/quality/quality-category-renderer/quality-category-renderer.component';
import { QualityCategoryFilterComponent } from './departments/quality/quality-category-filter/quality-category-filter.component';
import { QualityDetailsComponent } from './departments/quality/quality-details/quality-details.component';
import { QualityQuantityRendererComponent } from './departments/quality/quality-quantity-renderer/quality-quantity-renderer.component';
import { ShippingComponent } from './admin/shipping/shipping.component';
import { ShippingCategoryRendererComponent } from './admin/shipping/shipping-category-renderer/shipping-category-renderer.component';
import { ShippingCategoryFilterComponent } from './admin/shipping/shipping-category-filter/shipping-category-filter.component';
import { StoreRoomComponent } from './admin/store-room/store-room.component';
import { SearchComponent } from './shared/shared-components/search/search.component';
import { NewItemFormComponent } from './shared/shared-components/forms/new-item-form/new-item-form.component';
import { AssignItemFromComponent } from './shared/shared-components/forms/assign-item-from/assign-item-from.component';
import { GeneralRequestComponent } from './departments/requests/general-request/general-request.component';
import { StoreRoomRequestComponent } from './departments/requests/store-room-request/store-room-request.component';
import { GeneralRequestStepOneComponent } from './departments/requests/general-request/general-request-step-one/general-request-step-one.component';
import { GeneralRequestStepTwoComponent } from './departments/requests/general-request/general-request-step-two/general-request-step-two.component';
import { GeneralRequestStepThreeComponent } from './departments/requests/general-request/general-request-step-three/general-request-step-three.component';
import { RequestFormComponent } from './shared/shared-components/forms/request-form/request-form.component';
import { ConfirmationDialogComponent } from './shared/shared-components/dialog/confirmation-dialog/confirmation-dialog.component';
import { OfficeSupplyRequestStepOneComponent } from './departments/requests/office-supply-request/office-supply-request-step-one/office-supply-request-step-one.component';
import { OfficeSupplyRequestStepTwoComponent } from './departments/requests/office-supply-request/office-supply-request-step-two/office-supply-request-step-two.component';
import { OfficeSupplyRequestStepThreeComponent } from './departments/requests/office-supply-request/office-supply-request-step-three/office-supply-request-step-three.component';
import { OfficeSupplyRequestComponent } from './departments/requests/office-supply-request/office-supply-request.component';
import { StoreRoomRequestStepOneComponent } from './departments/requests/store-room-request/store-room-request-step-one/store-room-request-step-one.component';
import { StoreRoomRequestStepTwoComponent } from './departments/requests/store-room-request/store-room-request-step-two/store-room-request-step-two.component';
import { StoreRoomRequestStepThreeComponent } from './departments/requests/store-room-request/store-room-request-step-three/store-room-request-step-three.component';
import { StoreRoomCategoryRendererComponent } from './admin/store-room/store-room-category-renderer/store-room-category-renderer.component';
import { StoreRoomCategoryFilterComponent } from './admin/store-room/store-room-category-filter/store-room-category-filter.component';
import { GeneralRequestViewComponent } from './admin/requests/admin-general-request/general-request-view/general-request-view.component';
import { OfficeSupplyRequestViewComponent } from './admin/requests/admin-office-supply-request/office-supply-request-view/office-supply-request-view.component';
import { StoreRoomRequestViewComponent } from './admin/requests/admin-store-room-request/store-room-request-view/store-room-request-view.component';
import { GeneralRequestViewStatusRendererComponent } from './admin/requests/admin-general-request/general-request-view/general-request-view-status-renderer/general-request-view-status-renderer.component';
import { OfficeSupplyRequestViewStatusRendererComponent } from './admin/requests/admin-office-supply-request/office-supply-request-view/office-supply-request-view-status-renderer/office-supply-request-view-status-renderer.component';
import { StoreRoomRequestViewStatusRendererComponent } from './admin/requests/admin-store-room-request/store-room-request-view/store-room-request-view-status-renderer/store-room-request-view-status-renderer.component';
import { MatChipsModule } from '@angular/material/chips';
import { GeneralRequestItemsComponent } from './admin/requests/admin-general-request/general-request-items/general-request-items.component';
import { OfficeSupplyRequestItemsComponent } from './admin/requests/admin-office-supply-request/office-supply-request-items/office-supply-request-items.component';
import { StoreRoomRequestItemsComponent } from './admin/requests/admin-store-room-request/store-room-request-items/store-room-request-items.component';
import { AdminGeneralRequestComponent } from './admin/requests/admin-general-request/admin-general-request.component';
import { AdminOfficeSupplyRequestComponent } from './admin/requests/admin-office-supply-request/admin-office-supply-request.component';
import { AdminStoreRoomRequestComponent } from './admin/requests/admin-store-room-request/admin-store-room-request.component';
import { AuthComponent } from './auth/auth.component';
import { SignInFormComponent } from './shared/shared-components/forms/signin-form/signin-form.component';
import { loadingReducer } from './shared/store/loading/loading.reducer';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TopMenuComponent } from './shared/shared-components/navbar/top-menu/top-menu.component';
import { SideMenuComponent } from './shared/shared-components/navbar/side-menu/side-menu.component';
import { PageNotFoundComponent } from './shared/shared-components/page-not-found/page-not-found.component';
import { ChemicalsComponent } from './departments/chemicals/chemicals.component';
import { ChemicalsFilterPipe } from './shared/pipes/chemical-filter.pipe';
import { BreakroomRequestViewComponent } from './admin/requests/admin-breakroom-request/breakroom-request-view/breakroom-request-view.component';
import { BreakroomRequestViewStatusRendererComponent } from './admin/requests/admin-breakroom-request/breakroom-request-view/breakroom-request-view-status-renderer/breakroom-request-view-status-renderer.component';
import { AdminBreakroomRequestComponent } from './admin/requests/admin-breakroom-request/admin-breakroom-request.component';
import { BreakroomRequestStepOneComponent } from './departments/requests/breakroom-request/breakroom-request-step-one/breakroom-request-step-one.component';
import { BreakroomRequestStepTwoComponent } from './departments/requests/breakroom-request/breakroom-request-step-two/breakroom-request-step-two.component';
import { BreakroomRequestStepThreeComponent } from './departments/requests/breakroom-request/breakroom-request-step-three/breakroom-request-step-three.component';
import { BreakroomRequestComponent } from './departments/requests/breakroom-request/breakroom-request.component';
import { BreakroomRequestItemsComponent } from './admin/requests/admin-breakroom-request/breakroom-request-items/breakroom-request-items.component';
import { ExtractionsExpirationRendererComponent } from './departments/extractions/extractions-expiration-renderer/extractions-expiration-renderer.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExtractionsReceivedRendererComponent } from './departments/extractions/extractions-received-renderer/extractions-received-renderer.component';
import { DepartmentComponent } from './departments/department/department.component';
import { CategoryFilterComponent } from './departments/department/category-filter/category-filter.component';
import { CategoryRendererComponent } from './departments/department/category-renderer/category-renderer.component';
import { DetailsComponent } from './departments/department/details/details.component';
import { ExpirationRendererComponent } from './departments/department/expiration-renderer/expiration-renderer.component';
import { QuantityRendererComponent } from './departments/department/quantity-renderer/quantity-renderer.component';
import { ReceivedRendererComponent } from './departments/department/received-renderer/received-renderer.component';
import { MassSpecExpirationRendererComponent } from './departments/mass-spec/mass-spec-expiration-renderer/mass-spec-expiration-renderer.component';
import { MassSpecReceivedRendererComponent } from './departments/mass-spec/mass-spec-received-renderer/mass-spec-received-renderer.component';
import { ReceivingExpirationRendererComponent } from './departments/receiving/receiving-expiration-renderer/receiving-expiration-renderer.component';
import { ReceivingReceivedRendererComponent } from './departments/receiving/receiving-received-renderer/receiving-received-renderer.component';
import { QualityExpirationRendererComponent } from './departments/quality/quality-expiration-renderer/quality-expiration-renderer.component';
import { QualityReceivedRendererComponent } from './departments/quality/quality-received-renderer/quality-received-renderer.component';
import { RdExpirationRendererComponent } from './departments/rd/rd-expiration-renderer/rd-expiration-renderer.component';
import { RdReceivedRendererComponent } from './departments/rd/rd-received-renderer/rd-received-renderer.component';
import { ScreeningExpirationRendererComponent } from './departments/screening/screening-expiration-renderer/screening-expiration-renderer.component';
import { ScreeningReceivedRendererComponent } from './departments/screening/screening-received-renderer/screening-received-renderer.component';

@NgModule({
  declarations: [
    InventoryComponent,
    ExtractionsComponent,
    MasterComponent,
    StoreRoomComponent,
    NavbarComponent,
    ProfileComponent,
    BottomToolbarComponent,
    SnackbarComponent,
    ExtractionsDetailsComponent,
    ExtractionsQuantityRendererComponent,
    ExtractionsCategoryRendererComponent,
    ExtractionsCategoryFilterComponent,
    MassSpecComponent,
    MassSpecCategoryFilterComponent,
    MassSpecCategoryRendererComponent,
    MassSpecQuantityRendererComponent,
    MassSpecDetailsComponent,
    ReceivingComponent,
    ReceivingCategoryFilterComponent,
    ReceivingCategoryRendererComponent,
    ReceivingDetailsComponent,
    ReceivingQuantityRendererComponent,
    RdComponent,
    RdDetailsComponent,
    RdQuantityRendererComponent,
    RdCategoryFilterComponent,
    RdCategoryRendererComponent,
    ScreeningComponent,
    ScreeningQuantityRendererComponent,
    ScreeningCategoryRendererComponent,
    ScreeningCategoryFilterComponent,
    ScreeningDetailsComponent,
    QualityComponent,
    QualityCategoryRendererComponent,
    QualityCategoryFilterComponent,
    QualityDetailsComponent,
    QualityQuantityRendererComponent,
    ShippingComponent,
    ShippingCategoryRendererComponent,
    ShippingCategoryFilterComponent,
    SearchComponent,
    NewItemFormComponent,
    AssignItemFromComponent,
    OfficeSupplyRequestComponent,
    GeneralRequestComponent,
    StoreRoomRequestComponent,
    GeneralRequestStepOneComponent,
    GeneralRequestStepTwoComponent,
    GeneralRequestStepThreeComponent,
    RequestFormComponent,
    ConfirmationDialogComponent,
    StoreRoomRequestStepOneComponent,
    StoreRoomRequestStepTwoComponent,
    StoreRoomRequestStepThreeComponent,
    OfficeSupplyRequestStepOneComponent,
    OfficeSupplyRequestStepTwoComponent,
    OfficeSupplyRequestStepThreeComponent,
    StoreRoomCategoryRendererComponent,
    StoreRoomCategoryFilterComponent,
    GeneralRequestViewComponent,
    OfficeSupplyRequestViewComponent,
    StoreRoomRequestViewComponent,
    GeneralRequestViewStatusRendererComponent,
    OfficeSupplyRequestViewStatusRendererComponent,
    StoreRoomRequestViewStatusRendererComponent,
    GeneralRequestItemsComponent,
    OfficeSupplyRequestItemsComponent,
    StoreRoomRequestItemsComponent,
    AdminGeneralRequestComponent,
    AdminOfficeSupplyRequestComponent,
    AdminStoreRoomRequestComponent,
    AuthComponent,
    SignInFormComponent,
    TopMenuComponent,
    SideMenuComponent,
    PageNotFoundComponent,
    ChemicalsComponent,
    ChemicalsFilterPipe,
    BreakroomRequestViewComponent,
    BreakroomRequestViewStatusRendererComponent,
    AdminBreakroomRequestComponent,
    BreakroomRequestComponent,
    BreakroomRequestStepOneComponent,
    BreakroomRequestStepTwoComponent,
    BreakroomRequestStepThreeComponent,
    BreakroomRequestItemsComponent,
    ExtractionsExpirationRendererComponent,
    ExtractionsReceivedRendererComponent,
    DepartmentComponent,
    CategoryFilterComponent,
    CategoryRendererComponent,
    DetailsComponent,
    ExpirationRendererComponent,
    QuantityRendererComponent,
    ReceivedRendererComponent,
    MassSpecExpirationRendererComponent,
    MassSpecReceivedRendererComponent,
    ReceivingExpirationRendererComponent,
    ReceivingReceivedRendererComponent,
    QualityExpirationRendererComponent,
    QualityReceivedRendererComponent,
    RdExpirationRendererComponent,
    RdReceivedRendererComponent,
    ScreeningExpirationRendererComponent,
    ScreeningReceivedRendererComponent,
    
  ],
  imports: [
    StoreModule.forRoot({
      search: searchReducer,
      loading: loadingReducer
    }),
    AgGridModule.withComponents([

    ]),
    BrowserModule,
    InventoryRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatSelectModule,
    MatStepperModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [InventoryComponent]
})
export class InventoryModule { }
