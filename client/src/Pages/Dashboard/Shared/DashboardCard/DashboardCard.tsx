// DashboardCard.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { DashboardCardProps } from './type';

const DashboardCard: React.FC<DashboardCardProps> = ({ title, data }) => {
  return (
    <Card sx={{ minWidth: 275, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography sx={{ mb: 0, fontSize: 30, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
      </CardContent>
      <Divider sx={{ mb: 2, width: '90%',alignSelf: 'center' }} />
      <Typography variant="h5" component="div">
          Total: {data}
        </Typography>
    </Card>
  );
};

export default DashboardCard;
