import React, { useContext, useEffect, useState } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AppCtx from "../../context"
const Likes = ({ elPost, userId }) => {
	const [arrLikes, setArrLikes] = useState(elPost.likes)
	const [like, setLike] = useState()
	const { setPostsSrv, api } = useContext(AppCtx)
	useEffect(() => {
		setLike(arrLikes?.includes(userId))
		elPost.likes = arrLikes
		setPostsSrv(old => old.map(o => { return o._id === elPost?._id ? elPost : o }))
	}, [arrLikes, elPost]);


	const goLike = () => {
		if (like) {
			//удаляем из массива
			setArrLikes(arrLikes.filter(y => y !== userId));
		} else {
			// добавляем 	
			setArrLikes(old => [...old, userId])
		}
		api.setLike(elPost?._id, !like).then(data => {
			if (data.err) {
				console.log(data.message);
			}
		})
	}

	return (
		<span style={{ fontSize: "14px", fontWeight: "550", width: "auto", color: "grey", cursor: "pointer" }} onClick={goLike}>
			{!like ? <FavoriteBorderRoundedIcon style={{ fontSize: "24px", marginBottom: "3px", color: "crimson" }} /> : <FavoriteIcon style={{ fontSize: "24px", marginBottom: "3px", color: "crimson" }} />}
			{elPost.likes?.length}
		</span>

	);
}

export default Likes;
