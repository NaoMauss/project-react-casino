import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper, List, ListItem, Divider } from '@mui/material';

import Message from './Message';

interface IMessage {
    content: string;
    role: 'user' | 'system' | 'assistant';
}

interface IChatflow {
    [key: string]: {
        buttons: string[];
        answer: string;
    };
}

const Chatflow = {
    "Accueil": {
      "buttons": ["Problèmes de compte", "Dépôts et retraits", "Jeux", "Support technique"],
      "answer": "Bonjour, comment puis-je vous aider ?"
    },
    "Problèmes de compte": {
      "buttons": ["Réinitialisation du mot de passe", "Vérification du compte", "Problèmes de connexion"],
      "answer": "Je suis désolé pour les problèmes de compte, que puis-je faire pour vous aider aujourd'hui ?"
    },
    "Dépôts et retraits": {
      "buttons": ["Problèmes de dépôt", "Retirer des fonds", "Vérification des transactions"],
      "answer": "Vous rencontrez des problèmes avec vos dépôts ou retraits ? Sélectionnez une option pour plus d'aide."
    },
    "Jeux": {
      "buttons": ["Problèmes de chargement des jeux", "Erreurs en jeu", "Questions sur les règles des jeux"],
      "answer": "Des questions ou problèmes concernant les jeux ? Choisissez une option pour continuer."
    },
    "Support technique": {
      "buttons": ["Problèmes techniques du site", "Rapporter un bug ou une erreur"],
      "answer": "Besoin d'aide technique ? Dites-nous en plus sur votre problème."
    },
    "Réinitialisation du mot de passe": {
      "buttons": [],
      "answer": "Nous vous avons envoyé un lien pour réinitialiser votre mot de passe. Vérifiez votre email."
    },
    "Vérification du compte": {
      "buttons": [],
      "answer": "Nous allons vérifier les informations de votre compte et revenir vers vous."
    },
    "Problèmes de connexion": {
      "buttons": [],
      "answer": "Essayez de redémarrer votre appareil ou vérifiez votre connexion internet. Si le problème persiste, contactez le support."
    },
    "Problèmes de dépôt": {
      "buttons": [],
      "answer": "Vérifiez les informations de votre méthode de paiement ou contactez votre banque."
    },
    "Retirer des fonds": {
      "buttons": [],
      "answer": "Suivez les instructions données sur notre site pour retirer vos fonds. Contactez le support en cas de problème."
    },
    "Vérification des transactions": {
      "buttons": [],
      "answer": "Nous vérifions votre transaction. Vous recevrez une notification par email une fois que ce sera résolu."
    },
    "Problèmes de chargement des jeux": {
      "buttons": [],
      "answer": "Assurez-vous que votre navigateur est à jour et que vous n'avez pas de plugins bloquant le contenu."
    },
    "Erreurs en jeu": {
      "buttons": [],
      "answer": "Merci de nous avoir informé de cette erreur. Nous travaillons pour la résoudre au plus vite."
    },
    "Questions sur les règles des jeux": {
      "buttons": [],
      "answer": "Vous pouvez trouver les règles de nos jeux dans la section aide de notre site. Pour des questions spécifiques, contactez le support."
    },
    "Problèmes techniques du site": {
      "buttons": [],
      "answer": "Nous sommes désolés pour ce désagrément. Notre équipe technique travaille à résoudre ce problème."
    },
    "Rapporter un bug ou une erreur": {
      "buttons": [],
      "answer": "Votre rapport a été enregistré. Nous vous remercions pour votre aide dans l'amélioration de nos services."
    }
  };
  
  

export default function ChatInterface() {
    const [messages, setMessages] = useState<IMessage[]>([{ content: 'Hello', role: 'user' }]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [buttons, setButtons] = useState<string[]>(['Accueil']);
    const [model] = useState<string>('');
    const bottomRef = useRef<null | HTMLDivElement>(null);

    const sendMessage = async (input: string) => {
        if (!input) return;

        const newMessage: IMessage = { content: input, role: 'user' };
        setMessages([...messages, newMessage]);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = Chatflow[input]["answer"];
        const newButtons = Chatflow[input]["buttons"];
        const newResponse: IMessage = { content: response, role: 'assistant' };
        setButtons([...newButtons, 'Accueil']);
        setMessages([...messages, newMessage, newResponse]);
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close' : 'Chat'}
            </button>
            {isOpen && (
                <div style={{ width: '25%', position: 'fixed', right: '20px', bottom: '20px', backgroundColor: 'white', borderRadius: '10px', fontSize: '0.3rem'}}>
                    <Paper style={{ height: '50vh', overflow: 'auto', padding: '20px', backgroundColor: 'white' }}>
                        <List>
                            {messages.map((message, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        sx={{
                                            display: 'flex',
                                            justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                                            width: '100%'
                                        }}
                                    >
                                        <Message content={message.content} role={message.role} />
                                    </ListItem>
                                    {index < messages.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                            <div ref={bottomRef} />
                        </List>
                    </Paper>
                    <Box
                        component="form"
                        sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px', marginBottom: '20px', width: '90%', backgroundColor: 'white' }}
                        noValidate
                        autoComplete="off"
                    >
                        {buttons.map((button, index) => (
                            <Button key={index} variant="contained" color="primary" onClick={() => sendMessage(button)} style={{ margin: '5px', minWidth: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}>
                                {button}
                            </Button>
                        ))}
                    </Box>
                </div>
            )}
        </>
    );
}
