import SearchIcon from '@mui/icons-material/Search'
import "./Searchbar.css";

interface Props { 
    searchValue: string,
    onSearchValueChange:Function
}
function Searchbar({ searchValue, onSearchValueChange}: Props) {
  return (
      <div className="searchbar-container">
          <input onChange={(e) => { onSearchValueChange(e.target.value) }} type="text" id="searchbar" />
          {searchValue === "" && (
          <div className="searchbar-placeholder" onClick={(e) => { document.getElementById("searchbar")?.focus() }}>
              <SearchIcon id="searchbar-placeholder-icon" />
              <span>Search</span>
          </div>
              
          ) }
    </div>
  )
}

export default Searchbar