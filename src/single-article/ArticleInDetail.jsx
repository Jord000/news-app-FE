import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticleById } from "../../api/api";
import { Box, CircularProgress } from "@mui/material";
import CommentsById from "./CommentsById";

const ArticleInDetail = () => {
    const [foundArticle, setFoundArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        getArticleById(id).then((article) => {
            setFoundArticle(article)
        }).then(() => {
            setIsLoading(false)
        });
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>)
    } else return (
        <>
            <div className="found-article-by-id">
                <h2>{foundArticle.title}</h2>
                <p className="article-author"> By {foundArticle.author}</p>
                <img className='article-image' src={foundArticle.article_img_url} alt={`image relating to ${foundArticle.title}`} />
                <p className="found-article-body">{foundArticle.body}</p>
            </div>
            <CommentsById id={id} />
        </>
    )

}

export default ArticleInDetail