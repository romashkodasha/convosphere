import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import {Link} from "react-router-dom";
import './ParentCard.css';

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

const ParentCard = ({ username, text, sent_time, id }) => {



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
                <Link to={`/${id}`} className="link">ПЕРЕЙТИ К ОБСУЖДЕНИЮ</Link>
            </CardContent>
        </MuiCard>
    );
};

export default ParentCard;