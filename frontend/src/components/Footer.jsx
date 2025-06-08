import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

export const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-around items-center py-3 bg-[#FFFAF0]">
      <nav className="mb-3 md:mb-0">
        <ul className="flex gap-4 justify-center text-xs">
          <li><Link to={ROUTES.TERMS}>利用規約</Link></li>
          <li><Link to={ROUTES.PRIVACY}>プライバシーポリシー</Link></li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <small className="text-sm">&copy; 2025 なんこメシ</small>
        <Link to={"https://x.com/maaasaaayk"}>
          <svg width="15" height="15" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="black" />
          </svg>
        </Link>
        <Link to={"https://github.com/masa5281/nanko-meshi"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18">
            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </Link>
      </div>
    </footer>
  );
};
