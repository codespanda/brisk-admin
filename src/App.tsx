import { Routes, Route, Navigate } from 'react-router-dom'
import { Providers } from '@/providers'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { AuthLayout } from '@/layouts/AuthLayout'

import DashboardPage from '@/pages/DashboardPage'
import ProductsPage from '@/pages/ProductsPage'
import NewProductPage from '@/pages/NewProductPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import EditProductPage from '@/pages/EditProductPage'
import OrdersPage from '@/pages/OrdersPage'
import OrderDetailPage from '@/pages/OrderDetailPage'
import CustomersPage from '@/pages/CustomersPage'
import DiscountsPage from '@/pages/DiscountsPage'
import InventoryPage from '@/pages/InventoryPage'
import AdjustmentsPage from '@/pages/AdjustmentsPage'
import WarehousesPage from '@/pages/WarehousesPage'
import MarketingPage from '@/pages/MarketingPage'
import EmailMarketingPage from '@/pages/EmailMarketingPage'
import CampaignsPage from '@/pages/CampaignsPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import ProductAnalyticsPage from '@/pages/ProductAnalyticsPage'
import CustomerAnalyticsPage from '@/pages/CustomerAnalyticsPage'
import NotificationsPage from '@/pages/NotificationsPage'
import SettingsPage from '@/pages/SettingsPage'
import UsersPage from '@/pages/UsersPage'
import ChartsPage from '@/pages/ChartsPage'
import FormsPage from '@/pages/FormsPage'
import ComponentsPage from '@/pages/ComponentsPage'
import ErrorDemoPage from '@/pages/ErrorDemoPage'
import NotFoundDemoPage from '@/pages/NotFoundDemoPage'
import NotFoundPage from '@/pages/NotFoundPage'

import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'
import VerifyEmailPage from '@/pages/auth/VerifyEmailPage'

export default function App() {
  return (
    <Providers>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Route>

        {/* Dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<NewProductPage />} />
          <Route path="/products/:id/edit" element={<EditProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/discounts" element={<DiscountsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/adjustments" element={<AdjustmentsPage />} />
          <Route path="/inventory/warehouses" element={<WarehousesPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/marketing/email" element={<EmailMarketingPage />} />
          <Route path="/marketing/campaigns" element={<CampaignsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/analytics/products" element={<ProductAnalyticsPage />} />
          <Route path="/analytics/customers" element={<CustomerAnalyticsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/users" element={<UsersPage />} />
          <Route path="/resources/charts" element={<ChartsPage />} />
          <Route path="/resources/forms" element={<FormsPage />} />
          <Route path="/resources/components" element={<ComponentsPage />} />
          <Route path="/error-demo" element={<ErrorDemoPage />} />
          <Route path="/not-found-demo" element={<NotFoundDemoPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Providers>
  )
}
