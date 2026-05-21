import React from 'react';
import { FiMail, FiUsers, FiGrid, FiEye } from 'react-icons/fi';
import { usePlatformAdmin } from '../../../../../context/PlatformAdminContext';
import '../../shared/AdminShared.scss';

const AdminDashboardOverview = () => {
  const { data } = usePlatformAdmin();
  const cards = [
    { label: 'Managed pages', value: data.userViewPages.length, icon: FiGrid },
    { label: 'Visible nav pages', value: data.userViewPages.filter((page) => page.enabled && page.showInNav).length, icon: FiEye },
    { label: 'Users', value: data.users.length, icon: FiUsers },
    { label: 'HR invites', value: data.hrInvites.length, icon: FiMail },
  ];

  return (
    <main className="admin-page">
      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Everything managed from admin</h2>
            <p>Manage page content, navigation visibility, platform settings, users, and HR invitations from one place.</p>
          </div>
        </div>
        <div className="admin-kpi-grid">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <article className="admin-kpi" key={item.label}>
                <span className="admin-icon-badge"><Icon /></span>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboardOverview;
