import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingDonations, setPendingDonations] = useState([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored! You can now submit donations.');
      loadPendingDonations();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warn('You are offline. Donations will be saved and submitted when connection is restored.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    loadPendingDonations();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadPendingDonations = () => {
    try {
      const pending = JSON.parse(localStorage.getItem('pendingDonations') || '[]');
      setPendingDonations(pending);
    } catch (error) {
      console.error('Failed to load pending donations:', error);
    }
  };

  const savePendingDonation = (donationData) => {
    try {
      const pending = JSON.parse(localStorage.getItem('pendingDonations') || '[]');
      const newPending = [...pending, { ...donationData, id: Date.now(), timestamp: new Date().toISOString() }];
      localStorage.setItem('pendingDonations', JSON.stringify(newPending));
      setPendingDonations(newPending);
      toast.info('Donation saved offline. It will be submitted when you are back online.');
    } catch (error) {
      console.error('Failed to save pending donation:', error);
      toast.error('Failed to save donation offline.');
    }
  };

  const submitPendingDonations = async (submitFunction) => {
    if (pendingDonations.length === 0) return;

    toast.info('Submitting pending donations...');
    
    for (const donation of pendingDonations) {
      try {
        await submitFunction(donation);
        // Remove from pending list
        const updated = pendingDonations.filter(d => d.id !== donation.id);
        setPendingDonations(updated);
        localStorage.setItem('pendingDonations', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to submit pending donation:', error);
        toast.error(`Failed to submit donation for ${donation.name}`);
      }
    }

    if (pendingDonations.length === 0) {
      toast.success('All pending donations submitted successfully!');
    }
  };

  const clearPendingDonations = () => {
    localStorage.removeItem('pendingDonations');
    setPendingDonations([]);
  };

  return {
    isOnline,
    pendingDonations,
    savePendingDonation,
    submitPendingDonations,
    clearPendingDonations
  };
};
