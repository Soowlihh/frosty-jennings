// Mock for @vercel/analytics/react in tests
import React from 'react';

export const Analytics = () => null;
export const track = jest.fn();
