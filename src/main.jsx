import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'
import { ContentProvider } from './content.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
    </LangProvider>
  </StrictMode>,
)
