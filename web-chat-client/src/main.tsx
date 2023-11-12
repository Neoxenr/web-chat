import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import WebChat from './parts/Webchat/Webchat'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WebChat />
  </React.StrictMode>,
)
