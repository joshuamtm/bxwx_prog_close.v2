import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders login page initially', () => {
    render(<App />);
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
  });

  it('displays BronxWorks branding', () => {
    render(<App />);
    expect(screen.getByText('BronxWorks Program Closure System')).toBeInTheDocument();
  });
});