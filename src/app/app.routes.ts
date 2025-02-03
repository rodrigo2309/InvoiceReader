import { Routes } from '@angular/router';
import { BodyPageComponent } from './pages/body/body-page/body-page.component';
import { FramePageComponent } from './pages/master/frame.page';
import { ImportacaoPageComponent } from './pages/Importação/importacao-page/importacao-page.component';
import { AccountTypePageComponent } from './pages/accountType/account-type-page/account-type-page.component';

export const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    children: [
      { path: '', component: BodyPageComponent },
      { path: 'Index', component: BodyPageComponent },
      { path: 'Importação', component: ImportacaoPageComponent },
      { path: 'TipoContas', component: AccountTypePageComponent },
    ],
  },
];
