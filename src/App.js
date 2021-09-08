import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import './App.css';

function App() {

  const [handleData, setHandleData] = useState([])
  const  [pageNumber, setPageNumber] = useState(0)

  const userPerPage = 10
  const pagesVisted = pageNumber * userPerPage

  const displayUsers = handleData.slice(pagesVisted, pagesVisted + userPerPage).map(user => {
    return (
      <div key={user.id}>
        <h4>{user.email}</h4>
        <p>{user.body}</p>
      </div>
    )
  })

  const pageCount = Math.ceil(handleData.length / userPerPage)//math.ceil rounds up
  const changePage = ({selected}) => {
    setPageNumber(selected)
  }


  useEffect(()=> {
    const getData = async() => {
      const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      const data = await res.json()
      console.log(data)
      setHandleData(data.slice(0, 50))
    }

    getData()
  }, [])

  return (
    <div className="pagination-container">
      {displayUsers}
      <ReactPaginate
        previousLabel={"PREV"}
        nextLabel={"NEXT"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination-buttons"}
        previousLinkClassName={"prev-btn"}
        nextLinkClassName={"next-btn"}
        activeClassName={"pagination-active"}
      />
    </div>
  );
}

export default App;
