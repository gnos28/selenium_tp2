import React, { useState } from 'react';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [spamAnswer, setSpamAnswer] = useState('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const validateUsername = (value: string) => {
        // Validation: No special characters (alphanumeric only)
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

        // Anti-spam basic check (2 + 2 = 4)
        if (spamAnswer.trim() !== '4') {
            setMessage({ text: 'Anti-spam check failed! What is 2 + 2?', type: 'error' });
            return;
        }

        // Mock Authentication
        if (username === 'tomsmith' && password === 'SuperSecretPassword!') {
            setMessage({ text: 'You logged into a secure area!', type: 'success' });
        } else {
            setMessage({ text: 'Your username is invalid!', type: 'error' });
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Login</h2>
            {message && (
                <div 
                    id="flash" 
                    className={message.type} 
                    style={{ 
                        padding: '10px', 
                        marginBottom: '10px', 
                        backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: message.type === 'success' ? '#155724' : '#721c24',
                        borderColor: message.type === 'success' ? '#c3e6cb' : '#f5c6cb',
                        border: '1px solid transparent',
                        borderRadius: '.25rem'
                    }}
                >
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                    <small style={{ color: '#888' }}>Alphanumeric only</small>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="spam" style={{ display: 'block', marginBottom: '0.5rem' }}>Human Check: 2 + 2 = ?</label>
                    <input
                        type="text"
                        id="spam"
                        value={spamAnswer}
                        onChange={(e) => setSpamAnswer(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <button 
                    type="submit" 
                    id="login-button" 
                    style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
