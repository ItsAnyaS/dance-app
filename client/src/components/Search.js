import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Search.css'
const Search = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useState({})
    const [listings, setListings] = useState([])
    const [expandedSearchBar, setExpandedSearchBar] = useState(false)
        const handleSearch = async() => {
            let req = await fetch('http://localhost:3000/listings_search', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(searchParams)
            })
            let res = await req.json()
            console.log(res)
            setListings(res)
        }

    const handleInput = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit =(e) => {
        e.preventDefault()
        if (!expandedSearchBar){
            setExpandedSearchBar(true)
        }else {

            handleSearch()
        }
    }

    useEffect(()=> {
        const getAllListings = async() => {
            let req = await fetch("http://localhost:3000/listings")
            let res = await req.json()
            setListings(res)
        }
        getAllListings()
    }, [])

// console.log(searchParams)
    return (
        <main>
            <header id='search-header'>
                <h1 style={{marginLeft: '10%', marginBottom: '2em'}}>Listings</h1>
                <form onSubmit={handleSubmit} id='search-form' onChange={handleInput}>
                    <div id={expandedSearchBar ? 'search-bar-container-expanded': 'search-bar-container'}>
                  { expandedSearchBar && <input placeholder='Search keywords...' id='search-bar' name='keywords' />}
                    <button><ion-icon name="search-outline"></ion-icon></button>
                    </div>
                    {/* <div id='search-location-container'>
                    <input name='location' placeholder='location'/>
                    <select name='style'>
                        <option defaultChecked value={""} >--Select a style--</option>
                        <option name='tap'>tap</option>
                        <option name='ballet'>ballet</option>
                        <option name='jazz'>jazz</option>
                        <option name='contemporary'>contemporary</option>
                    </select>
                    </div> */}
                </form>
            </header>
            <section id='listing-container' onClick={()=> {setExpandedSearchBar(false)}}>
            {listings.map(listing => {
                return (
                    <div className='listing-item'onClick={()=> {navigate(`/listing/${listing?.id}`)}} key={listing?.id}>
                        <div className='listing-item-info'>
                        <h4>{listing?.title}</h4>
                        <p>{listing?.description}</p>
                        </div>
                        <div className='listing-item-cta'>
                            <h5>${listing?.compensation}</h5>
                        </div>
                    </div>
                )
            })}
              
            </section>
        </main>
    )
}

export default Search