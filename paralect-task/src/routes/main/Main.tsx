import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div className="m-auto text-center">
      <h2 className="pb-2 text-4xl">Welcome to my page !</h2>
      <h3 className="pb-8 text-2xl">Choose the page you would like to visit</h3>
      <div className="flex justify-center gap-24 pb-12 text-xl">
        <Link
          to="/users"
          className="text-white bg-black rounded-xl py-2 px-4 cursor-pointer transition duration-1000 ease-out hover:-translate-y-1"
        >
          Users
        </Link>
        <Link
          to="/albums"
          className="text-white bg-black rounded-xl py-2 px-4 cursor-pointer transition duration-1000 ease-out hover:-translate-y-1"
        >
          Albums
        </Link>
      </div>
      <p className="text-xl">
        P.S. There should be many pages to choose but I was too lazy to make other pages so pretend
        like there are
      </p>
    </div>
  );
}
