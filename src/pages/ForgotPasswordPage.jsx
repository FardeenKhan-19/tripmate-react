import React, { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { Box, Button, Container, TextField, Typography, Link, CircularProgress, Alert } from '@mui/material';

// --- Reusable Animated Background Component ---
const AnimatedBackground = () => {
    const icons = useMemo(() => {
        const travelIconsSvgs = [
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>`,
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
        ];
        return Array.from({ length: 30 }).map((_, index) => ({
            id: index,
            svg: travelIconsSvgs[Math.floor(Math.random() * travelIconsSvgs.length)],
            style: {
                left: `${Math.random() * 100}vw`,
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                animationDuration: `${Math.random() * 20 + 15}s`,
                animationDelay: `${Math.random() * 10}s`,
            }
        }));
    }, []);
    return (
        <Box sx={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden',
            '@keyframes floatUp': { '0%': { transform: 'translateY(0)', opacity: 0 }, '10%, 90%': { opacity: 1 }, '100%': { transform: 'translateY(-120vh)', opacity: 0 } }
        }}>
            {icons.map(icon => (
                <Box key={icon.id} component="div" dangerouslySetInnerHTML={{ __html: icon.svg }} sx={{ position: 'absolute', bottom: '-100px', color: 'rgba(255, 255, 255, 0.15)', animation: 'floatUp linear infinite', ...icon.style }} />
            ))}
        </Box>
    );
};

// --- Reusable Logo Component ---
const TripMateLogo = () => (
    <Box sx={{ display: 'inline-block', mb: 2 }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L11.55 21.74C7.41 18.22 4 15.36 4 11.5C4 7.36 7.36 4 11.5 4C13.36 4 15.14 4.78 16.42 6.08L17.92 4.58C16.03 2.69 13.86 1.5 11.5 1.5C6.25 1.5 2 5.75 2 11.5C2 16.62 6.17 20.13 10.45 23.15L12 24.5L13.55 23.15C14.04 22.73 14.5 22.33 14.93 21.95L12 19.5V13.5L19.5 6L12 21.35Z" fill="white"/>
            <path d="M22 2L11 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </Box>
);

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            await resetPassword(email);
            setMessage('Check your inbox for further instructions.');
        } catch (err) {
            console.error(err);
            setError('Failed to reset password. Please check the email address.');
        }
        setLoading(false);
    };

    return (
        <Box sx={{
            minHeight: '100vh', width: '100vw', position: 'relative', overflow: 'hidden',
            // --- UPDATED BACKGROUND ---
            // A semi-transparent gradient is applied over the image to maintain the color theme
            backgroundImage: 'linear-gradient(to bottom right, rgba(76, 29, 149, 0.8), rgba(49, 46, 129, 0.8), rgba(190, 24, 93, 0.8)), url(https://img.freepik.com/free-vector/realistic-travel-background-with-elements_52683-77784.jpg?q=80&w=2070&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <AnimatedBackground />
            <Container component="main" maxWidth="xs" sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', position: 'relative', zIndex: 1,
            }}>
                <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Box sx={{
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4,
                        borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
                        color: 'white', textAlign: 'center',
                    }}>
                        <TripMateLogo />
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Reset Password
                        </Typography>
                        <Typography sx={{ mb: 3, opacity: 0.7 }}>
                            Enter your email to receive a reset link.
                        </Typography>

                        {error && <Alert severity="error" sx={{ width: '100%', mb: 2, backgroundColor: 'rgba(255, 100, 100, 0.2)', color: 'white' }}>{error}</Alert>}
                        {message && <Alert severity="success" sx={{ width: '100%', mb: 2, backgroundColor: 'rgba(100, 255, 100, 0.2)', color: 'white' }}>{message}</Alert>}

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }} sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'rgba(255,255,255,0.2)', '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' }, '& input': { color: 'white' } } }} />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5, backgroundColor: 'white', color: '#4c1d95', fontWeight: 'bold', '&:hover': { backgroundColor: '#f0f0f0' } }} disabled={loading}>
                                    {loading ? <CircularProgress size={24} sx={{ color: '#4c1d95' }} /> : 'Send Reset Link'}
                                </Button>
                            </motion.div>
                            <Typography align="center" variant="body2">
                                <Link component={RouterLink} to="/login" variant="body2" sx={{color: 'white', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' }}}>
                                    Back to Login
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ForgotPasswordPage;
