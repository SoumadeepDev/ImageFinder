import ThemeToggle from "./ThemeToggle";
import SearchForm from "./SearchForm";
import Gallery from "./Gallery";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "./context";

const App = () => {
  const { isDarkTheme } = useGlobalContext();
  return (
    <main>
      <ThemeToggle />
      <SearchForm />
      <Gallery />
      <ToastContainer
        autoClose={1000}
        position="top-center"
        theme={isDarkTheme ? "dark" : "light"}
      />
    </main>
  );
};
export default App;
