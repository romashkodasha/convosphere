import { Link } from 'react-router-dom';
import { Button, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTopicsAction } from '../../store/actions/topics';
import { tokenRefreshAction } from '../../store/actions/token';
import { getMessagesAction, postMessagesAction } from '../../store/actions/messages';
import { getUsersAction } from '../../store/actions/users';
import ParentCard from '../../components/ParentCard/ParentCard';




import jwtDecode from 'jwt-decode';

function decodeToken(tokenAccess) {
    return jwtDecode(tokenAccess);
}

function mapMessagesToUsernames(messages, users) {
    if (!messages) {
        return [];
    }
    if (!users) {
        return [];
    }

    return messages.map((message) => {
        const senderId = message.sender;
        const matchingUser = users.find((user) => user.id === senderId);
        const username = matchingUser ? matchingUser.username : 'Unknown User';

        return { ...message, username };
    });
}

function getUserIdByUsername(users, username) {
    if(!users){
        return null;
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i].id;
        }
    }
    // Если пользователь с заданным username не найден, можно вернуть null или другое значение по вашему выбору
    return null;
}




function HomePage() {
    const { topics, getTopicsStatus } = useSelector((store) => store.topicsReducer);
    const { messages, getMessagesStatus } = useSelector((store) => store.messagesReducer);
    const { users, getUsersStatus } = useSelector((store) => store.usersReducer);
    const [open, setOpen] = useState(false);
    const [messageText, setMessageText] = useState('');


    const tokenAccess = localStorage.getItem('tokenAccess');
    const tokenRefresh = localStorage.getItem('tokenRefresh');

    const dispatch = useDispatch();
    const [selectedTopic, setSelectedTopic] = useState(null);



    useEffect(() => {
        if (getTopicsStatus === 'initial')
            dispatch(getTopicsAction());
    }, [getTopicsStatus, dispatch]);

    useEffect(() => {
        if (getMessagesStatus === 'initial')
            dispatch(getMessagesAction());
    }, [getMessagesStatus, dispatch]);


    useEffect(() => {
        if (getUsersStatus === 'initial')
            dispatch(getUsersAction());
    }, [getUsersStatus, dispatch]);

    const messagesWithUsernames = mapMessagesToUsernames(messages, users);
    console.log(messagesWithUsernames)
    localStorage.setItem('userId', getUserIdByUsername(users, localStorage.getItem('username')));


    const isTokenValid = () => {
        if (!tokenAccess) {
            // Токен отсутствует, считаем его недействительным
            return false;
        }
        const decodedToken = decodeToken(tokenAccess);
        // Получение текущего времени в секундах
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
            // Срок действия токена истек
            return false;
        }
        // Токен действителен
        return true;
    };


    useEffect(() => {
        if (!isTokenValid() && tokenAccess) {
            dispatch(tokenRefreshAction({
                refresh: tokenRefresh
            }));
        }
    }, [dispatch, tokenAccess]);

    const handleLogout = () => {
        localStorage.removeItem('tokenAccess');
        localStorage.removeItem('tokenRefresh');
        window.location.reload();

    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch(postMessagesAction({
            topic: 1,
            text: messageText,
            token: tokenAccess
        }))
            .catch((error) => {
                console.log('Ошибка:', error);
            });


        // Закрытие формы после отправки
        setOpen(false);
        setMessageText('');
    };


    const handleTopicClick = (topicId) => {

    };
    return (
        <div>
            <nav>
                <div id="logo">
                    <Link to="/" className='link'>
                        convosphere
                    </Link>
                </div>
                <div className="search-container">
                    <div className="search-icon"><SearchIcon /></div>
                    <InputBase placeholder="Найти..." />
                </div>
                {isTokenValid() ? (<Button component={Link} to="/" variant="contained" color="inherit" onClick={handleLogout} id="logout-button">
                    Выход
                </Button>) : (

                    <div className='log-reg-buttons'>
                        <Button component={Link} to="/register" variant="contained" color="inherit" id="reg-button">
                            Регистрация
                        </Button>
                        <Button component={Link} to="/login" variant="contained" color="inherit">
                            Вход
                        </Button>
                    </div>
                )}

            </nav>


            <Drawer
                open={true}
                variant='permanent'
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 320,
                        marginTop: 13,
                    },
                }}
            >
                <List>
                    {topics.map((topic) => (
                        <ListItem
                            button
                            key={topic.topic_id}
                            onClick={() => handleTopicClick(topic.topic_id)}
                            selected={selectedTopic === topic.topic_id}
                        >
                            <ListItemText primary={topic.name} />
                        </ListItem>
                    ))}

                </List>
            </Drawer>

            <Container className="messages-container">
                <Row xs={4} md={4} className="g-4">
                    {messagesWithUsernames.map((item, index) => {
                        return (
                            <Col key={index}>
                                <ParentCard {...item} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>

            {isTokenValid() && (

                <div>
                    <Button variant="contained" color="primary" onClick={handleOpen} style={{
                        position: 'absolute',
                        width: '229px',
                        height: '42px',
                        right: '100px',
                        top: '167px',
                        backgroundColor: 'rgba(142, 29, 255, 0.38)',

                    }}>
                        Написать сообщение
                    </Button>

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
            )}



        </div>

    );
}

export default HomePage;
