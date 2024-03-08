import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,CardActions,Button} from '@mui/material';
import { FaRegStar } from "react-icons/fa";
const MovieCard = (props) => {
    return (
        <div>

<Card sx={{ maxWidth: 400, width:250, marginLeft: 'auto', marginRight: 'auto' }}>
      <CardActionArea>
        <CardMedia
            component="img"
            height="450"

            image={`https://image.tmdb.org/t/p/original${props.data.poster_path}`}
            alt="green iguana"
        />
         <CardContent sx={{height:'auto', textWrap:'break-word'}}>
          <Typography gutterBottom variant="h5" component="div">
          {props.data.title}
          </Typography>
          <Typography variant="body2">
          <FaRegStar /> {props.data.vote_average} ({props.data.vote_count} )
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> 
       </div>
    );
    }
    export default MovieCard;