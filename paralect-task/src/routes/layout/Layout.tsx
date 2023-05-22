import { Outlet } from 'react-router-dom';
import { HeaderResponsive as Header } from '../../components/header/Header';

export default function Layout() {
  const links = [
    { link: '/vacancies', label: 'Поиск Вакансий' },
    { link: '/favorites', label: 'Избранное' },
  ];
  return (
    <div className="m-auto max-w-6xl px-10 min-h-screen flex flex-col py-8">
      <Header links={links} />
      <main className="pb-8 flex-1 flex">
        <Outlet />
      </main>
      <footer className="border-t border-black">
        <div className="flex justify-between mt-4">
          <p>
            Created by{' '}
            <a
              href="https://github.com/artemmironchik"
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Artem Mironchik
            </a>
          </p>
          <p>2022</p>
        </div>
      </footer>
    </div>
  );
}
