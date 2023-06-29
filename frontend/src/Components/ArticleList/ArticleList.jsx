import React from 'react';
import { useState } from 'react';
import './ArticleList.css';
import Article from './Article.jsx';

const ArticleList = () => {

    // const [articles, setArticles] = useState([]);
    const articles = [
        {
            id: 1,
            coverimg: "/CoverImg5.jpg",
            title: "Jaydeep Article 1",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "development",
            author: "Jay",
            authoerId: '1',
            authoerImg: '/CoverImg5.jpg',
            views: 919,
            rating: 4.5,
            createdAt: 123
        },
        {
            id: 2,
            coverimg: "/CoverImg2.png",
            title: "Jaydeep Article 2",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "backend",
            author: "Deep",
            authoerId: '2',
            authoerImg: '/CoverImg5.jpg',
            views: 1024,
            rating: 4.2,
            createdAt: 123
        },
        {
            id: 3,
            coverimg: "/CoverImg3.jpg",
            title: "Jaydeep Article 3",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "fronend",
            author: "JayDeep",
            authoerId: '3',
            authoerImg: '/CoverImg5.jpg',
            views: 1358,
            rating: 4.7,
            createdAt: 123
        },
        {
            id: 4,
            coverimg: "/CoverImg6.png",
            title: "Jaydeep Article 1",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "development",
            author: "Jay",
            authoerId: '1',
            authoerImg: '/CoverImg5.jpg',
            views: 919,
            rating: 4.5,
            createdAt: 123
        },
        {
            id: 5,
            coverimg: "/CoverImg4.jpg",
            title: "Jaydeep Article 2",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "backend",
            author: "Deep",
            authoerId: '2',
            authoerImg: '/CoverImg5.jpg',
            views: 1024,
            rating: 4.2,
            createdAt: 123
        },
        {
            id: 3,
            coverimg: "/CoverImg1.jpeg",
            title: "Jaydeep Article 3",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "fronend",
            author: "JayDeep",
            authoerId: '3',
            authoerImg: '/CoverImg5.jpg',
            views: 1358,
            rating: 4.7,
            createdAt: 123
        },
        {
            id: 1,
            coverimg: "/CoverImg5.jpg",
            title: "Jaydeep Article 1",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "development",
            author: "Jay",
            authoerId: '1',
            authoerImg: '/CoverImg5.jpg',
            views: 919,
            rating: 4.5,
            createdAt: 123
        },
        {
            id: 2,
            coverimg: "/CoverImg2.png",
            title: "Jaydeep Article 2",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "backend",
            author: "Deep",
            authoerId: '2',
            authoerImg: '/CoverImg5.jpg',
            views: 1024,
            rating: 4.2,
            createdAt: 123
        },
        {
            id: 3,
            coverimg: "/CoverImg3.jpg",
            title: "Jaydeep Article 3",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "fronend",
            author: "JayDeep",
            authoerId: '3',
            authoerImg: '/CoverImg5.jpg',
            views: 1358,
            rating: 4.7,
            createdAt: 123
        },
        {
            id: 4,
            coverimg: "/CoverImg6.png",
            title: "Jaydeep Article 1",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "development",
            author: "Jay",
            authoerId: '1',
            authoerImg: '/CoverImg5.jpg',
            views: 919,
            rating: 4.5,
            createdAt: 123
        },
        {
            id: 5,
            coverimg: "/CoverImg4.jpg",
            title: "Jaydeep Article 2",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "backend",
            author: "Deep",
            authoerId: '2',
            authoerImg: '/CoverImg5.jpg',
            views: 1024,
            rating: 4.2,
            createdAt: 123
        },
        {
            id: 3,
            coverimg: "/CoverImg1.jpeg",
            title: "Jaydeep Article 3",
            desc: "asdfghj edtg noayuda i db h q liwbg geeb eb b eb er b,f mfmbjmf ,edf dfushdiuwher f mhdf s hr jh dfdf",
            category: "fronend",
            author: "JayDeep",
            authoerId: '3',
            authoerImg: '/CoverImg5.jpg',
            views: 1358,
            rating: 4.7,
            createdAt: 123
        }
    ]
    return (
        <div className='article-list-container'>
            {articles && articles.map(article => (
                <Article article={article} key={article.id} />
            ))}
        </div>
    )
}

export default ArticleList