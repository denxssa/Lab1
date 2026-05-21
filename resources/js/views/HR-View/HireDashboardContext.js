import React, { createContext, useContext, useMemo, useState } from 'react';
import applicationsData from './components/pages/HireDashboardAnalytics/applicationsData';

export const HireDashboardContext = createContext(null);

export const HireDashboardProvider = ({ children }) => {
  const [apps, setApps] = useState(applicationsData);
  const [listingsVersion, setListingsVersion] = useState(0);

  const refreshListings = () => setListingsVersion((v) => v + 1);

  const shortlistedCandidates = useMemo(
    () => apps.filter((a) => a.status === 'Shortlisted'),
    [apps]
  );

  return (
    <HireDashboardContext.Provider value={{
      apps,
      setApps,
      shortlistedCandidates,
      listingsVersion,
      refreshListings,
    }}
    >
      {children}
    </HireDashboardContext.Provider>
  );
};

export const useHireDashboard = () => useContext(HireDashboardContext);
