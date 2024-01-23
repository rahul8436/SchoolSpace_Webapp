import AllUsers from './AllUsers';
import NotFound from './NotFound';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllUsers />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
