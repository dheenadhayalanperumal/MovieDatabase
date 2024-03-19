import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';
import { FaRegStar } from "react-icons/fa";


const MovieCard = ({ data, onClick }) => {
    return (
        <div onClick={() => onClick(data.id)}>
        

                        <Card sx={{ width:192, marginLeft: 'auto', marginRight: 'auto' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        width="100%"
                        height="289"
                        image={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                        alt="green iguana"
                    />
                    <CardContent sx={{ backgroundColor: 'black', color: 'white', height: 'auto', textWrap: 'break-word' }}>
                        <Typography gutterBottom variant="h7" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {data.title || data.original_name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8D8D8D' }}>
                            <FaRegStar /> {data.vote_average} ({data.vote_count})
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default MovieCard;