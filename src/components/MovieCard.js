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
          <Card sx={{ maxWidth: 400, width: 250, marginLeft: 'auto', marginRight: 'auto' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="450"
                        image={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                        alt="green iguana"
                    />
                    <CardContent sx={{ height: 'auto', textWrap: 'break-word' }}>
                        <Typography gutterBottom variant="h7" component="div">
                            {data.title || data.original_name}
                        </Typography>
                        <Typography variant="body1">
                            <FaRegStar /> {data.vote_average} ({data.vote_count})
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default MovieCard;