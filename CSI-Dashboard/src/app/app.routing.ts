
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    data: { title: 'Choose A Demo' }
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'material',
        loadChildren: () => import('./views/material-example-view/material-example-view.module').then(m => m.MaterialExampleViewModule),
        data: { title: 'Material', breadcrumb: 'MATERIAL'}
      },
      {
        path: 'dialogs',
        loadChildren: () => import('./views/app-dialogs/app-dialogs.module').then(m => m.AppDialogsModule),
        data: { title: 'Dialogs', breadcrumb: 'DIALOGS'}
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', breadcrumb: 'PROFILE'}
      },
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
        data: { title: 'Others', breadcrumb: 'OTHERS'}
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/tables/tables.module').then(m => m.TablesModule),
        data: { title: 'Tables', breadcrumb: 'TABLES'}
      },
      {
        path: 'tour',
        loadChildren: () => import('./views/app-tour/app-tour.module').then(m => m.AppTourModule),
        data: { title: 'Tour', breadcrumb: 'TOUR'}
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule),
        data: { title: 'Forms', breadcrumb: 'FORMS'}
      },
      {
        path: 'chart',
        loadChildren: () => import('./views/chart-example-view/chart-example-view.module').then(m => m.ChartExampleViewModule),
        data: { title: 'Charts', breadcrumb: 'CHARTS'}
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/charts.module').then(m => m.AppChartsModule),
        data: { title: 'Charts', breadcrumb: 'CHARTS'}
      },
      {
        path: 'map',
        loadChildren: () => import('./views/map/map.module').then(m => m.AppMapModule),
        data: { title: 'Map', breadcrumb: 'MAP'}
      },
      {
        path: 'dragndrop',
        loadChildren: () => import('./views/dragndrop/dragndrop.module').then(m => m.DragndropModule),
        data: { title: 'Drag and Drop', breadcrumb: 'DND'}
      },
      {
        path: 'inbox',
        loadChildren: () => import('./views/app-inbox/app-inbox.module').then(m => m.AppInboxModule),
        data: { title: 'Inbox', breadcrumb: 'INBOX'}
      },
      {
        path: 'calendar',
        loadChildren: () => import('./views/app-calendar/app-calendar.module').then(m => m.AppCalendarModule),
        data: { title: 'Calendar', breadcrumb: 'CALENDAR'}
      },
      {
        path: 'chat',
        loadChildren: () => import('./views/app-chats/app-chats.module').then(m => m.AppChatsModule),
        data: { title: 'Chat', breadcrumb: 'CHAT'}
      },
      {
        path: 'cruds',
        loadChildren: () => import('./views/cruds/cruds.module').then(m => m.CrudsModule),
        data: { title: 'CRUDs', breadcrumb: 'CRUDs'}
      },
      {
        path: 'shop',
        loadChildren: () => import('./views/shop/shop.module').then(m => m.ShopModule),
        data: { title: 'Shop', breadcrumb: 'SHOP'}
      },
      {
        path: 'search',
        loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'todo',
        loadChildren: () => import('./views/todo/todo.module').then(m => m.TodoModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule),
        data: { title: 'Orders', breadcrumb: 'Orders'}
      },
      {
        path: 'page-layouts',
        loadChildren: () => import('./views/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)
      },
      {
        path: 'utilities',
        loadChildren: () => import('./views/utilities/utilities.module').then(m => m.UtilitiesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/mat-icons/mat-icons.module').then(m => m.MatIconsModule),
        data: { title: 'Icons', breadcrumb: 'Icons'}
      },
      
      {
        path: 'client-review',
        loadChildren: () => import('./views/Component/Operation/client-review/crudsClientReview.module').then(m => m.CrudsClientReviewModule),
        data: { title: 'Client Review', breadcrumb: 'Client Review'}
      },

      {
        path: 'project',
        loadChildren: () => import('./views/Component/Operation/project/crudProject.module').then(m => m.CrudsModule),
        data: { title: 'Project', breadcrumb: 'Projects'}
      },
      {
        path: 'time-off',
        loadChildren: () => import('./views/Component/HumanResource/timeOff/timeOff.module').then(m => m.TimeOffModule),
        data: { title: 'TimeOff', breadcrumb: 'TimeOffs'}
      },
      {
        path: 'time-off-employee',
        loadChildren: () => import('./views/Component/HumanResource/timeOffEmployee/app-calendar.module').then(m => m.TimeOffCalendarModule),
        data: { title: 'TimeOff', breadcrumb: 'TimeOffs'}
      },
      {
        path: 'partner',
        loadChildren: () => import('./views/Component/Sales/partner/crudsPartner.module').then(m => m.PartnerModule),
        data: { title: 'Partner', breadcrumb: 'Partners'}
      },
      {
        path: 'requirement',
        loadChildren: () => import('./views/Component/Sales/Requirement/req.module').then(m => m.ReqModule),
        data: { title: 'Tables', breadcrumb: 'TABLES'}
      },
      {
        path: 'resource',
        loadChildren: () => import('./views/Component/HumanResource/resource/resource.module').then(m => m.ResourceModule),
        data: { title: 'Resource', breadcrumb: 'Resources'}
      },
      {
        path: 'externalResource',
        loadChildren: () => import('./views/Component/HumanResource/resource/resource.module').then(m => m.ResourceModule),
        data: { title: 'External Resource', breadcrumb: 'External Resources'}
      },
      {
        path: 'backOfficeResource',
        loadChildren: () => import('./views/Component/HumanResource/resource/resource.module').then(m => m.ResourceModule),
        data: { title: 'Back Office Resource', breadcrumb: 'Back Office Resources'}
      },
      {
        path: 'add-resource',
        loadChildren: () => import('./views/Component/HumanResource/resource/createResource/add-resource.module').then(m => m.AddResourceModule),
        data: { title: 'AddResource', breadcrumb: 'AddResources'}
      },
      {
        path: 'add-backoffice-resource',
        loadChildren: () => import('./views/Component/HumanResource/resource/createResource/add-resource.module').then(m => m.AddResourceModule),
        data: { title: 'AddBackOfficeResource', breadcrumb: 'AddBackOfficeResources'}
      },
      {
        path: 'add-external-resource',
        loadChildren: () => import('./views/Component/HumanResource/resource/createResource/add-resource.module').then(m => m.AddResourceModule),
        data: { title: 'AddExternalResource', breadcrumb: 'AddExternalResources'}
      },
      {
        path: 'contractEmployee',
        loadChildren: () => import('./views/Component/HumanResource/contracts/contractEmployee/contractEmployee.module').then(m => m.ContractEmployeeModule),
        data: { title: '', breadcrumb: ''}
      },
       {
        path: 'ficheResource',
        loadChildren: () => import('./views/Component/HumanResource/resource/resource.module').then(m => m.ResourceModule),
        data: { title: '', breadcrumb: ''}
      },
 {
        path: 'candidat',
        loadChildren: () => import('./views/Component/HumanResource/candidate/CandidatCrud/candidat-crud.module').then(m => m.CandidatCrudModule),
        data: { title: 'Candidat', breadcrumb: 'Candidat'}
      },
      {
        path: 'cvCandidat',
        loadChildren: () => import('./views/Component/HumanResource/candidate/CvCandidat/cv-candidat.module').then(m => m.CvCandidatModule),
        data: { title: 'CvCandidat', breadcrumb: 'CVCANDIDAT'}
      },
      {
        path: 'candidatUpdate',
        loadChildren: () => import('./views/Component/HumanResource/candidate/updateCandidat/updateCandidat.module').then(m => m.updateCandidatModule),
        data: { title: 'update', breadcrumb: 'update'}
      },

      {
        path: 'candidatAffichage/:id',
        loadChildren: () => import('./views/Component/HumanResource/candidate/CandidatCrud/candidat-crud.module').then(m => m.CandidatCrudModule),
        data: { title: 'CandidatAffichage', breadcrumb: 'Candidat'}
      },
      {
        path: 'tableOffer',
        loadChildren: () => import('./views/Component/HumanResource/offer/offer-crud.module').then(m => m.OfferCrudModule),
        data: { title: 'CandidatAffichage', breadcrumb: 'Candidat'}
      },
      {
        path: 'affichageOffer',
        loadChildren: () => import('./views/Component/HumanResource/offer/affichage_offer/affichage_offer.module').then(m => m.OfferAffichageModule),
        data: { title: 'offerAffichage', breadcrumb: 'Candidat'}
      },

      {
        path: 'CandidatEvaluation',
        loadChildren: () => import('./views/Component/HumanResource/entretienRecrutment/affichage_entreteinrecrutment/affichage_entretienRecrutment.module').then(m => m.EntretienRecrutmentModule),
        data: { title: 'EntretienRecrutment', breadcrumb: 'ENTRETIEN&RECRUTMENT'}
      },

      {
        path: 'entretienTable',
        loadChildren: () => import('./views/Component/HumanResource/entretienRecrutment/crud_table_entretienRecrutment/crud_entretienRecrutment.module').then(m => m.CrudEntretienRecrutmentModule),
        data: { title: 'CrudEvaluation', breadcrumb: 'ENTRETIEN&RECRUTMENT'}
      },
      {
        path: 'evaluationCrud',
        loadChildren: () => import('./views/Component/HumanResource/entretienRecrutment/add_evaluation/add_crud_evaluation.module').then(m => m.CrudEvaluationModule),
        data: { title: 'Evaluation', breadcrumb: 'ENTRETIEN&RECRUTMENT'}
      },
      
      
      {
        path: 'Add-contract-employee',
        loadChildren: () => import('./views/Component/HumanResource/contracts/contractEmployee/contractEmployee.module').then(m => m.ContractEmployeeModule),
        data: { title: 'AddContractEmployee', breadcrumb: 'AddContractEmployee'}
      }
      
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

