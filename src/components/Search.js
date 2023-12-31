import { useState } from "react";
import search from "../assets/search.svg";

function Search({ onChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const newTerm = event.target.value;

    onChange(newTerm);
    setSearchTerm(newTerm);
  };

  return (
    <div className="flex space-x-[10px] mt-[5px]">
      <img className="w-[24px] h-[24px]" src={search} alt="" />
      <form>
        <input
          type="text"
          placeholder="Αναζήτηση..."
          className="bg-background-light text-[16px] font-pop font-normal text-textFont-dark focus:outline-none"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default Search;
