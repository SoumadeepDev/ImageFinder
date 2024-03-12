import { toast } from "react-toastify";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) {
      return;
    }
    setSearchTerm(e.target.elements.search.value);
    // e.target.elements.search.value = "";
  };
  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input search-input"
          name="search"
          placeholder="search here..."
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </section>
  );
};
export default SearchForm;
