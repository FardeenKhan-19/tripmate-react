import React, { useState, useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

// Import Particles and the engine
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// MUI Components
import { Box, Button, Container, TextField, Typography, Link, CircularProgress, Alert, Checkbox, FormControlLabel } from '@mui/material';

// Import your background image
import loginBackground from '../assets/background.jpg';
import Logo from '../components/Logo';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    // This function is required for the Particles component to load its engine
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/'); // Navigate to the dashboard on successful login
        } catch (err) {
            console.error(err);
            setError('Failed to sign in. Please check your credentials.');
        }
        setLoading(false);
    };

    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
            {/* Motion-activated Particle Background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: {
                        image: `url(${loginBackground})`,
                        position: '50% 50%',
                        repeat: 'no-repeat',
                        size: 'cover',
                    },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                        },
                        modes: {
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.2,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.3,
                        },
                        shape: {
                            type: "star", // Changed from "circle" to "star"
                        },
                        size: {
                            value: { min: 1, max: 4 }, // Adjusted size for better star appearance
                        },
                    },
                    detectRetina: true,
                }}
                style={{ position: 'absolute', zIndex: 0 }}
            />

            {/* Login Form Container */}
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    position: 'relative', // Ensure it sits on top of the particles
                    zIndex: 1,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // A smoother easing function
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
                            // Darker, more refined glassmorphism effect
                            backgroundColor: 'rgba(25, 12, 52, 0.2)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
                            color: 'white',
                        }}
                    >
                        <Logo />

                        <Typography sx={{ mb: 3, mt: 1, opacity: 0.8 }}>
                            Sign in to continue your journey
                        </Typography>

                        {error && <Alert severity="error" sx={{ width: '100%', mb: 2, backgroundColor: 'rgba(255, 100, 100, 0.2)', color: 'white' }}>{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Username"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' },
                                        '& input': { color: 'white' },
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' },
                                        '& input': { color: 'white' },
                                    },
                                }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{color: 'rgba(255, 255, 255, 0.7)', '&.Mui-checked': {color: 'white'}}} />}
                                    label="Remember me"
                                />
                                <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{color: 'white'}}>
                                    Forgot password?
                                </Link>
                            </Box>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.5,
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        color: '#333',
                                        '&:hover': {
                                            backgroundColor: 'white'
                                        }
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                                </Button>
                            </motion.div>
                            <Typography align="center" variant="body2">
                                Don't have an account?{' '}
                                <Link component={RouterLink} to="/signup" variant="body2" sx={{color: 'white', fontWeight: 'bold'}}>
                                    Register
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default LoginPage;
