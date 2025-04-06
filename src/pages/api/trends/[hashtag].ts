import { NextApiRequest, NextApiResponse } from 'next';
import { mockTrendData } from '../../../mocks/trendData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { hashtag } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!hashtag || typeof hashtag !== 'string') {
    return res.status(400).json({ message: 'Hashtag is required' });
  }

  const data = mockTrendData[hashtag];

  if (!data) {
    return res.status(404).json({ message: 'Hashtag not found' });
  }

  return res.status(200).json(data);
} 