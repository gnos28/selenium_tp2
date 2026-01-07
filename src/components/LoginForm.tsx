import React, { useState } from 'react';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [spamAnswer, setSpamAnswer] = useState('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const validateUsername = (value: string) => {
        const regex = /^[a-zA-Z0-9]*$/;
        return regex.test(value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (validateUsername(val)) {
            setUsername(val);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (spamAnswer.trim() !== '4') {
            setMessage({ text: 'Anti-spam check failed! What is 2 + 2?', type: 'error' });
            return;
        }

        if (username === 'tomsmith' && password === 'SuperSecretPassword!') {
            setMessage({ text: 'You logged into a secure area!', type: 'success' });
        } else {
            setMessage({ text: 'Your username is invalid!', type: 'error' });
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        fontSize: '15px',
        outline: 'none',
        transition: 'all 0.2s ease',
        marginTop: '8px'
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '14px',
        fontWeight: 500,
        color: 'var(--text-muted)'
    };

    return (
        <div style={{ 
            maxWidth: '440px', 
            width: '100%',
            padding: '40px', 
            background: 'var(--card-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
            <h2 style={{ fontSize: '28px', marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px', fontSize: '15px' }}>
                Please enter your details to sign in.
            </p>

            {message && (
                <div 
                    id="flash" 
                    className={message.type} 
                    style={{ 
                        padding: '12px 16px', 
                        marginBottom: '24px', 
                        backgroundColor: message.type === 'success' ? 'var(--success-bg)' : 'var(--error-bg)',
                        color: message.type === 'success' ? 'var(--success-text)' : 'var(--error-text)',
                        border: '1px solid currentColor',
                        borderOpacity: 0.2,
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        textAlign: 'center'
                    }}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="username" style={labelStyle}>Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="e.g. tomsmith"
                        value={username}
                        onChange={handleUsernameChange}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        required
                        style={inputStyle}
                    />
                    <small style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                        Alphanumeric only
                    </small>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="password" style={labelStyle}>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <label htmlFor="spam" style={labelStyle}>Human Verification (2 + 2)</label>
                    <input
                        type="text"
                        id="spam"
                        placeholder="Your answer"
                        value={spamAnswer}
                        onChange={(e) => setSpamAnswer(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        required
                        style={inputStyle}
                    />
                </div>

                <button 
                    type="submit" 
                    id="login-button" 
                    style={{ 
                        width: '100%', 
                        padding: '14px', 
                        backgroundColor: 'var(--primary)', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
