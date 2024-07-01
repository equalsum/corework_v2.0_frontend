import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';


describe('App', () => {
    test('renders App component', () => {
      render(<BrowserRouter>
              <App />
            </BrowserRouter>);
    });
});