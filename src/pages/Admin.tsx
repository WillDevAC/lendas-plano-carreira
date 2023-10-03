import React from 'react';

import Header from '../components/Header';
import UserRankingListAdmin from '../components/UserRankingListAdmin';

const AdminPage: React.FC = () => {
  return (
    <>
        <Header/>
        <UserRankingListAdmin/>
    </>
  );
}

export default AdminPage;