import React, { useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Box, Button, Container, TextField, Typography, Link, CircularProgress, Alert } from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import loginBackground from '../assets/background.jpg';
import Logo from '../components/Logo';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuth();

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

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
            minHeight: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
            // Correctly apply background here
            backgroundImage: `url(${loginBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Particles
                id="tsparticles-forgot"
                init={particlesInit}
                options={{
                    fpsLimit: 60,
                    interactivity: { events: { onHover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 100, duration: 0.4 } } },
                    particles: {
                        color: { value: "#ffffff" },
                        links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
                        move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
                        number: { density: { enable: true, area: 800 }, value: 80 },
                        opacity: { value: 0.3 },
                        shape: { type: "star" },
                        size: { value: { min: 1, max: 4 } },
                    },
                    detectRetina: true,
                }}
                style={{ position: 'absolute', zIndex: 0 }}
            />
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        sx={{
                            maxWidth: '400px',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 4,
                            borderRadius: (theme) => theme.shape.borderRadius,
                            backgroundColor: 'rgba(25, 12, 52, 0.2)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
                            color: 'white',
                        }}
                    >
                        <MarkEmailReadIcon sx={{ fontSize: 40, color: 'white', mb: 2 }} />
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Reset Password
                        </Typography>
                        <Typography color="white" sx={{ mb: 3, textAlign: 'center' }}>
                            Enter your email to receive a reset link.
                        </Typography>

                        {error && <Alert severity="error" sx={{ width: '100%', mb: 2, backgroundColor: 'rgba(255, 100, 100, 0.2)', color: 'white' }}>{error}</Alert>}
                        {message && <Alert severity="success" sx={{ width: '100%', mb: 2, backgroundColor: 'rgba(100, 255, 100, 0.2)', color: 'white' }}>{message}</Alert>}

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' }, '& input': { color: 'white' }, }, }} />
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', '&:hover': { backgroundColor: 'white' } }} disabled={loading}>
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
                                </Button>
                            </motion.div>
                            <Typography align="center" variant="body2">
                                <Link component={RouterLink} to="/login" variant="body2" sx={{color: 'white', fontWeight: 'bold'}}>
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