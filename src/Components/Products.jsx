import React from "react";
import {AiOutlineCaretUp} from "react-icons/ai"
export const Products = () => {
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [query, setQuery] = React.useState('bikes')
    const [loading, setLoading] = React.useState(false);
    const divRef = React.useRef();
    React.useEffect(() => {
        fetch(
            `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=25`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "563492ad6f9170000100000153773b5c95d14d0291140d39b7064f0e",
                },
            }
        )
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                setData([...response.photos]);

            });
    },[query])
    React.useEffect(() => {
        setLoading(true);
        fetch(
            `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=25`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "563492ad6f9170000100000153773b5c95d14d0291140d39b7064f0e",
                },
            }
        )
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                setData([...data, ...response.photos]);
            });
    }, [page]);
    const handleScroll = () => {
        if (divRef.current.scrollTop + divRef.current.clientHeight > divRef.current.scrollHeight-5) {
            setPage((page)=>page+1)
         }
    }
    const scrollUp = () => {
        divRef.current.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            });
    }; 
    const myDebounce = (cb, delay) => {
        let timer;
        return (...args) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(...args)
            },delay)
        }
    }
    const handleChange = myDebounce((e) => {
        console.log('api called')
        setQuery(e.target.value);
    },1000)
    return (
        <div className="inputQuery">
            <h1> Infinite Scroll</h1>
            <input type="text"  style={{height:"2em",fontWeight:"bolder",marginBottom:"2em"}} onChange={handleChange} placeholder="search here"/>
            <div ref={divRef} className="mDiv"  onScroll={handleScroll} style={{ display: "flex",flexDirection: "column", height: "88vh", overflowY: 'scroll'}}>
                {
                    data.map((item) => {
                        return (<div key={item.src.large2x} className="prodDiv">
                            <img src={item.src.large2x} alt={item.src.large2x} />
                            <p>{item.alt}</p>
                        </div>)
                    })
                }</div>
            { loading? <h1 style={{position: 'relative',bottom:"20px"}}>Loading...</h1>:null}
            <div style={{ position: "fixed", bottom: "50px", right: '50px' ,cursor:"pointer" }}><AiOutlineCaretUp onClick={scrollUp} style={{ width: "50px", height: "50px" }}></AiOutlineCaretUp>
            </div>
        </div>
    )
}