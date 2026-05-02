/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import PlaceholderPage from './pages/PlaceholderPage';
import UserPermissions from './pages/UserPermissions';
import AccessLogs from './pages/AccessLogs';

import SystemConfig from './pages/SystemConfig';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/calendar/*" element={
              <ProtectedRoute>
                <PlaceholderPage title="CALENDAR" />
              </ProtectedRoute>
            } />
            
            {/* General Modules (Read-only by default) */}
            <Route path="/operations/*" element={
              <ProtectedRoute>
                <PlaceholderPage title="OPERATIONS" />
              </ProtectedRoute>
            } />
            <Route path="/crm/*" element={
              <ProtectedRoute>
                <PlaceholderPage title="CRM & Leads" />
              </ProtectedRoute>
            } />
            <Route path="/marketing/*" element={
              <ProtectedRoute>
                <PlaceholderPage title="Marketing Hub" />
              </ProtectedRoute>
            } />
            <Route path="/analytics/*" element={
              <ProtectedRoute>
                <PlaceholderPage title="ANALYTICS" />
              </ProtectedRoute>
            } />
            <Route path="/performance/*" element={
              <ProtectedRoute>
                <PlaceholderPage title="PERFORMANCE" />
              </ProtectedRoute>
            } />
            <Route path="/master-data/*" element={
              <ProtectedRoute>
                <PlaceholderPage title="MASTER DATA" />
              </ProtectedRoute>
            } />

            {/* Confidential Modules */}
            <Route path="/financials/*" element={
              <ProtectedRoute isConfidential>
                <PlaceholderPage title="FINANCIALS" />
              </ProtectedRoute>
            } />
            <Route path="/settings/config" element={
              <ProtectedRoute isConfidential>
                <SystemConfig />
              </ProtectedRoute>
            } />
            <Route path="/settings/*" element={
              <ProtectedRoute isConfidential>
                <PlaceholderPage title="SETTINGS" />
              </ProtectedRoute>
            } />
            <Route path="/permissions" element={
              <ProtectedRoute isConfidential>
                <UserPermissions />
              </ProtectedRoute>
            } />
            <Route path="/access-logs" element={
              <ProtectedRoute isConfidential>
                <AccessLogs />
              </ProtectedRoute>
            } />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

