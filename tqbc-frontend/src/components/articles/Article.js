import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import History from "../../helpers/History";
import ArticleService from "../../services/ArticleService";
import "./Article.css";
import { TQBCArticleFooter } from "./TQBCArticleFooter";

export const Article = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const [imageURL, setImageURL] = useState("");

    const params = useParams();

    useEffect(
        () => {
            ArticleService.getArticle(params.articleID).then(
                (res) => {
                    setTitle(res.data.articleTitle);
                    document.title = res.data.articleTitle;
                    setContent(createContent(res.data.articleText));
                    setImageURL(res.data.imageURL);
                }
            ).catch(
                (err) => {
                    History.push("/nope")
                }
            )
        },
        []
    )

    const createContent = (txt) => {
        let paras = txt.split("\n\n");
        let returnMe = [];
        var ix = 0;
        for (const para of paras) {
            returnMe.push(
                <p
                    key={ix}
                >
                    {para}
                </p>
            )
            ix += 1;
        }
        return returnMe;
    }

    return (
        <div id="article-parent-div">
            <h1
                id="article-title"
            >
                {title}
            </h1>
            <img
                id="article-image"
                src={imageURL}
            />
            {content}
            <TQBCArticleFooter/>
        </div>
    );
}