function Search() {
  return (
      <div class="graph_search">
         <select name="continents" id="continents">
                       <option disabled selected value> -- select a counties -- </option>            
                       <option value="Asia">Asia</option>
                       <option value="Americas">Americas</option>
                       <option value="Europe">Europe</option>
                       <option value="Africa">Africa</option>
         </select>
                <select name="countries" id="countries"></select>
</div> 
  );
}
export default Search;
