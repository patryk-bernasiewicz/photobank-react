import { Link } from 'components/Link/Link';
import { Outlet } from 'react-router-dom';

export const Profile = () => (
  <div className="container">
    <div className="flex flex-col md:flex-row">
      <ul className="my-2 flex list-none flex-col gap-2 md:min-w-[160px] md:flex-grow-0 md:px-2">
        <li>
          <Link to="/profile">Summary</Link>
        </li>
        <li>
          <Link to="/profile/edit">Edit</Link>
        </li>
      </ul>
      <div className="flex-grow pr-2 md:pl-4">
        <Outlet />
      </div>
    </div>
  </div>
);
