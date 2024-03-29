import { useGlobalContext } from "./context";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();

  return (
    <section className="toggle-container">
      <button className="dark-toggle" onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <BsFillMoonStarsFill className="toggle-icon moon" />
        ) : (
          <BsFillSunFill className="toggle-icon sun" />
        )}
      </button>
    </section>
  );
};
export default ThemeToggle;
