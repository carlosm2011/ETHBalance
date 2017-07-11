import { Routes, RouterModule } from '@angular/router';
import { BalanceComponent } from "./balance/balance.component";
const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/balance', pathMatch: 'full' },
    { path: 'balance', component: BalanceComponent }
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);
