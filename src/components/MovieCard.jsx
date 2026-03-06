import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';
import { FaRegStar } from "react-icons/fa";


const MovieCard = React.memo(({ data, onClick }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(data.id);
        }
    };

    return (
        <div
            onClick={() => onClick(data.id)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${data.title || data.original_name}`}
        >
            <Card sx={{ width: { xs: 160, sm: 192 }, marginLeft: 'auto', marginRight: 'auto' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        width="100%"
                        height="289"
                        image={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                        alt={`Movie poster for ${data.title || data.original_name}`}
                        loading="lazy"
                    />
                    <CardContent sx={{ backgroundColor: 'black', color: 'white', height: 'auto', textWrap: 'break-word' }}>
                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {data.title || data.original_name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#8D8D8D' }}>
                            <span aria-label={`Rating: ${data.vote_average?.toFixed(2)} out of 10, based on ${data.vote_count} votes`}>
                                <FaRegStar aria-hidden="true" /> {data.vote_average?.toFixed(2)} ({data.vote_count})
                            </span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
});

export default MovieCard;