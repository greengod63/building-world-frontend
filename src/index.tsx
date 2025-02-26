import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import ModalsProvider from './context/modalsContext'
import ChatProvider from './context/chat/chatContext';
import ProfileProvider from './context/profile/profileContext';
import ProjectProvider from './context/project/projectContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ModalsProvider>
    <ChatProvider>
      <ProjectProvider>
        <ProfileProvider>
          <Router>
            <App />
          </Router>
        </ProfileProvider>
      </ProjectProvider>
    </ChatProvider>
  </ModalsProvider>
);
