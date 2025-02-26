import AcceptInvitationRegister from "./pages/acceptInvintation/register/register";
import AcceptInvitationLogin from "./pages/acceptInvintation/login/login";
import AcceptInvitationConfirmation from "./pages/acceptInvintation/confirmation/confirmation"

import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import Confirmation from './pages/confirmation/confirmation';
import NotFound from './pages/notFound/notFound'
import SearchWorker from './pages/searchWorker/searchWorker';
import Hierachy from './pages/hierarchy/hierarchy';
import Pipeline from './pages/pipeline/pipeline'
import Profile from './pages/profile/pofile';
import Register from "./pages/register/register";
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';


const Router: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/accept-invitation/register/:token" element={<AcceptInvitationRegister />} />
      <Route path="/accept-invitation/login/:token" element={<AcceptInvitationLogin />} />
      <Route path="/accept-invitation/confirmation/:email/:token" element={<AcceptInvitationConfirmation />} />
      <Route path="/confirm" element={<Confirmation />} />
      <Route path="/confirmation/:email" element={<Confirmation />} />
      <Route path="/hierarchy" element={<Hierachy />} />
      <Route path="/search_workers" element={<SearchWorker />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile/*" element={<Profile />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/pipeline" element={<Pipeline />} />
    </Routes>
  );
};

export default Router;
