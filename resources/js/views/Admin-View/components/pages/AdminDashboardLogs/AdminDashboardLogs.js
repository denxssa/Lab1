import React, { useMemo, useState } from 'react';
import { FiDownload, FiSearch, FiTrash2 } from 'react-icons/fi';
import { usePlatformAdmin } from '../../../../../context/PlatformAdminContext';
import '../../shared/AdminShared.scss';

const AdminDashboardLogs = () => {
  const { data, deleteRecord } = usePlatformAdmin();
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const logs = data.activityLogs || [];
  const roles = ['All', ...Array.from(new Set(logs.map((log) => log.role)))];

  const filteredLogs = useMemo(() => {
    const q = query.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesRole = role === 'All' || log.role === role;
      const matchesQuery = !q || [log.actor, log.role, log.action, log.page, log.path, log.device, log.time]
        .join(' ')
        .toLowerCase()
        .includes(q);

      return matchesRole && matchesQuery;
    });
  }, [logs, query, role]);

  const exportLogs = () => {
    const rows = filteredLogs.map((log) => ({
      actor: log.actor,
      role: log.role,
      action: log.action,
      page: log.page,
      path: log.path,
      device: log.device,
      time: log.time,
    }));
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bee-hired-admin-logs.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="admin-page">
      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Activity logs</h2>
            <p>Monitor who visited which page and from what device. Laravel can persist this later.</p>
          </div>
          <button className="admin-btn admin-btn-light" type="button" onClick={exportLogs}>
            <FiDownload />
            Export
          </button>
        </div>

        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Search logs</label>
            <div className="admin-input-with-icon">
              <FiSearch />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Actor, page, path, device..." />
            </div>
          </div>
          <div className="admin-field">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Page visits</h2>
            <p>{filteredLogs.length} matching events</p>
          </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Who</th>
              <th>Role</th>
              <th>Action</th>
              <th>Where</th>
              <th>Device</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.actor}</td>
                <td>{log.role}</td>
                <td>{log.action}</td>
                <td>
                  <strong>{log.page}</strong>
                  <br />
                  <span>{log.path}</span>
                </td>
                <td>{log.device}</td>
                <td>{log.time}</td>
                <td>
                  <button className="admin-btn admin-btn-light" type="button" onClick={() => deleteRecord('activityLogs', log.id)}>
                    <FiTrash2 />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default AdminDashboardLogs;
