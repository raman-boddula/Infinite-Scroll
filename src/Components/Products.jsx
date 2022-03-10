import React from "react";
import {AiOutlineCaretUp} from "react-icons/ai"
export const Products = () => {
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const divRef = React.useRef();
    React.useEffect(() => {
        setLoading(true);
        getData();
    }, [page]);
    function getData() {
        fetch(
            `https://api.pexels.com/v1/search?query=bikes&page=${page}&per_page=25`,
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
                setLoading(false)
                setData([...data, ...response.photos]);
                console.log(response)

            });
    }
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
    return (
        <div>
            <h1> Infinite Scroll</h1>
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