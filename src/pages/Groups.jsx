import { Navigate } from 'react-router-dom';

const Groups = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Redirecting to dashboard...</p>
      </div>
      <Navigate to="/app/dashboard" replace />
    </>
  );
};

export default Groups;