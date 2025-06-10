import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, LinearProgress, Button, Box, Chip } from '@mui/material';

const CauseCard = ({ cause }) => {
  const progressPercentage = (cause.raisedAmount / cause.goalAmount) * 100;
  const remainingAmount = cause.goalAmount - cause.raisedAmount;

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <Box
        sx={{
          height: 192,
          background: 'linear-gradient(to right, #4ade80, #3b82f6)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Chip 
            label={cause.category} 
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              mb: 1 
            }} 
          />
          <Typography variant="h6" fontWeight="bold">
            {cause.title}
          </Typography>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {cause.description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" fontWeight="600" color="primary">
              {progressPercentage.toFixed(1)}%
            </Typography>
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage} 
            sx={{ height: 8, borderRadius: 1 }}
          />
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Raised
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="primary">
              KSh {cause.raisedAmount.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Goal
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              KSh {cause.goalAmount.toLocaleString()}
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          KSh {remainingAmount.toLocaleString()} remaining
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/donate/${cause.id}`}
          variant="contained"
          fullWidth
          sx={{ 
            py: 1.5,
            fontWeight: 600
          }}
        >
          Donate Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default CauseCard;
