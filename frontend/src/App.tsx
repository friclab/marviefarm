import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import { CollectionProvider } from '@/lib/collection';
import Layout from '@/components/app/Layout';
import LoginPage from '@/pages/LoginPage';
import SexesPage from '@/pages/sizing/SexesPage';
import ModeltypesPage from '@/pages/sizing/ModeltypesPage';
import SizesPage from '@/pages/sizing/SizesPage';
import ModeltypesSexesPage from '@/pages/sizing/ModeltypesSexesPage';
import ModeltypesSexSizesPage from '@/pages/sizing/ModeltypesSexSizesPage';
import SuppliersPage from '@/pages/materials/SuppliersPage';
import UnitMeasurementsPage from '@/pages/materials/UnitMeasurementsPage';
import MaterialTypesPage from '@/pages/materials/MaterialTypesPage';
import MaterialsPage from '@/pages/materials/MaterialsPage';
import FixedCompositionsPage from '@/pages/compositions/FixedCompositionsPage';
import DynamicCompositionsPage from '@/pages/compositions/DynamicCompositionsPage';
import ProjectsPage from '@/pages/catalog/ProjectsPage';
import CollectionsPage from '@/pages/catalog/CollectionsPage';
import ArticlesPage from '@/pages/catalog/ArticlesPage';
import ArticleDetailPage from '@/pages/catalog/ArticleDetailPage';
import FabricsPage from '@/pages/catalog/FabricsPage';
import CustomersPage from '@/pages/customers/CustomersPage';
import OrdersPage from '@/pages/orders/OrdersPage';
import OrderDetailPage from '@/pages/orders/OrderDetailPage';
import ReportsPage from '@/pages/reports/ReportsPage';
import CostPreviewPage from '@/pages/reports/CostPreviewPage';
import MaterialConsumptionPage from '@/pages/reports/MaterialConsumptionPage';

export default function App() {
  return (
    <AuthProvider>
      <CollectionProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/orders" replace />} />
          <Route path="/sizing/sexes" element={<SexesPage />} />
          <Route path="/sizing/modeltypes" element={<ModeltypesPage />} />
          <Route path="/sizing/sizes" element={<SizesPage />} />
          <Route path="/sizing/modeltypes-sexes" element={<ModeltypesSexesPage />} />
          <Route path="/sizing/modeltypes-sex-sizes" element={<ModeltypesSexSizesPage />} />
          <Route path="/materials/suppliers" element={<SuppliersPage />} />
          <Route path="/materials/unit-measurements" element={<UnitMeasurementsPage />} />
          <Route path="/materials/material-types" element={<MaterialTypesPage />} />
          <Route path="/materials/materials" element={<MaterialsPage />} />
          <Route path="/compositions/fixed" element={<FixedCompositionsPage />} />
          <Route path="/compositions/dynamic" element={<DynamicCompositionsPage />} />
          <Route path="/catalog/projects" element={<ProjectsPage />} />
          <Route path="/catalog/collections" element={<CollectionsPage />} />
          <Route path="/catalog/articles" element={<ArticlesPage />} />
          <Route path="/catalog/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/catalog/fabrics" element={<FabricsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/cost-preview" element={<CostPreviewPage />} />
          <Route path="/reports/material-consumption" element={<MaterialConsumptionPage />} />
        </Route>
      </Routes>
      </CollectionProvider>
    </AuthProvider>
  );
}
