import React from 'react';
import { Typography, Box } from '@mui/material';

interface MessageProps {
  content: string;
  role: string;
}

const Message: React.FC<MessageProps> = ({ content, role }) => {
  const isUser = role === 'user'; // Assuming 'user' is the author of user messages

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-start' : 'flex-end',
        backgroundColor: isUser ? '#1976d2' : '#f5f5f5',
        color: isUser ? 'white' : 'black',
        borderRadius: '20px',
        padding: '10px 20px',
        maxWidth: '70%',
      }}
    >
      <Typography variant="body1" sx={{ fontSize: '0.8rem' }}>
        {content}
      </Typography>
    </Box>
  );
}

export default Message;