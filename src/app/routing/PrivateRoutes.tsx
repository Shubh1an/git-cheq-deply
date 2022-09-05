import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import Loader from '../../_metronic/loader/loader'
import BrandVoucherCategoryWrapper from '../pages/BranVouchers/BrandVouchers'
import CreateBrandVoucher from '../pages/BranVouchers/CreateBrandVouchers'
const LoanProviderWrapper = lazy(() => import('../pages/loanProvider/LoanProvider'))
const RewardsWrapper = lazy(() => import('../pages/rewards/Rewards'))
const CreateVoucher = lazy(() => import('../pages/voucher/CreateVoucher'))
const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
const OfferPageWrapper = lazy(() => import('../pages/OfferPage'))
const OfferCreatePage = lazy(() => import('../pages/OfferCreatePage'))
const EventWrapper = lazy(() => import('../pages/event/EventWrapper'))
const ProductMasterWrapper = lazy(() => import('../pages/product-master/ProductMaster'))
const AddProductWrapper = lazy(() => import('../pages/product-master/AddProduct'))
const UpdateProductWrapper = lazy(() => import('../pages/product-master/UpdateProduct'))
const BankMasterWrapper = lazy(() => import('../pages/BankMaster/BankMaster'))
const TopBankMasterWrapper = lazy(() => import('../pages/BankMaster/TopBanks'))
const AddBankModal = lazy(() => import('../pages/BankMaster/AddBankModal'))
const UpdateBankMasterWrapper = lazy(() => import('../pages/BankMaster/UpdateBankMaster'))
const CreateEventWrapper = lazy(() => import('../pages/event/_modals/create-event/create-event'))
const RoutingWrapper = lazy(() => import('../pages/routing/Routing'))
const VoucherCategoryWrapper = lazy(() => import('../pages/voucher/Voucher'))

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route
          path='auth/*'
          element={
            <SuspensedView>
              <Navigate to='/dashboard' />
            </SuspensedView>
          }
        />
        {/* Pages */}
        <Route
          path='dashboard'
          element={
            <SuspensedView>
              <DashboardWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='builder'
          element={
            <SuspensedView>
              <BuilderPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='event'
          element={
            <SuspensedView>
              <EventWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='event/create'
          element={
            <SuspensedView>
              <CreateEventWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='menu-test'
          element={
            <SuspensedView>
              <MenuTestPage />
            </SuspensedView>
          }
        />
        <Route
          path='offers'
          element={
            <SuspensedView>
              <OfferPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='bankmaster'
          element={
            <SuspensedView>
              <BankMasterWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='top-banks'
          element={
            <SuspensedView>
              <TopBankMasterWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='bankmaster/view/:id'
          element={
            <SuspensedView>
              <UpdateBankMasterWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='bankmaster/create-bank-master'
          element={
            <SuspensedView>
              <AddBankModal />
            </SuspensedView>
          }
        />
        <Route
          path='productmaster'
          element={
            <SuspensedView>
              <ProductMasterWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='loanprovider'
          element={
            <SuspensedView>
              <LoanProviderWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='routing'
          element={
            <SuspensedView>
              <RoutingWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='rewards'
          element={
            <SuspensedView>
              <RewardsWrapper />
            </SuspensedView>
          }
        />

        <Route
          path='productmaster/create'
          element={
            <SuspensedView>
              <AddProductWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='productmaster/view/:id'
          element={
            <SuspensedView>
              <UpdateProductWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='offers/create-offer'
          element={
            <SuspensedView>
              <OfferCreatePage />
            </SuspensedView>
          }
        />
        <Route
          path='voucher-category'
          element={
            <SuspensedView>
              <VoucherCategoryWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='voucher-category/create-voucher'
          element={
            <SuspensedView>
              <CreateVoucher />
            </SuspensedView>
          }
        />
        <Route
          path='voucher-category/update-voucher/:id'
          element={
            <SuspensedView>
              <CreateVoucher />
            </SuspensedView>
          }
        />
        <Route
          path='brand-voucher-category'
          element={
            <SuspensedView>
              <BrandVoucherCategoryWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='create-brand-voucher'
          element={
            <SuspensedView>
              <CreateBrandVoucher />
            </SuspensedView>
          }
        />
        <Route
          path='update-brand-voucher/:id'
          element={
            <SuspensedView>
              <CreateBrandVoucher />
            </SuspensedView>
          }
        />

        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<Loader isLoading={true} />}>{children}</Suspense>
}

export {PrivateRoutes}
