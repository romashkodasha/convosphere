import React from 'react';
import { Card as MuiCard, CardContent, Typography, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import './MessageCard.css';

function formatTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
    const year = dateTime.getFullYear();

    // Добавляем ведущие нули, если нужно
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return `${formattedDay}.${formattedMonth}.${year}`;
}

const MessageCard = ({ socket, username, text, sent_time, id }) => {
    const [open, setOpen] = useState(false);
    const [messageText, setMessageText] = useState('');
    const dispatch = useDispatch();
    const handleOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {

        const message = {
            event: "create_msg",
            topic: 4,
            sender: localStorage.getItem('userId'),
            text: messageText,
            parent: id,

        };
        console.log(message)
        socket.send(JSON.stringify(message));



        // Закрытие формы после отправки
        setOpen(false);
        setMessageText('');
    };


    return (
        <MuiCard className='card'>
            <CardContent>
                <Typography variant="h6" component="h2">
                    @{username}
                </Typography>
                <Typography variant="body1" component="p" className='text'>
                    {text}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                    {formatTime(sent_time)}
                </Typography>
                <div>
                    <Button onClick={handleOpen}>Ответить</Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Написать сообщение</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Текст сообщения"
                                multiline
                                rows={4}
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Button onClick={handleClose}>Назад</Button>
                            <Button onClick={handleSubmit} color="primary">
                                Отправить
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </CardContent>
        </MuiCard>
    );
};

export default MessageCard;