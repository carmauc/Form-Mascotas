import { Outlet, useLocation } from 'react-router-dom'
const Layout = () => {
	const location = useLocation()
	return (
		<div className='md:flex md:min-h-screen '>
			<aside className='md:w-1/4 px-5 py-20 bg-[url(/background.svg)] text-center'>
				<h2 className=' font-bold text-white text-4xl'>
					FORMULARIOS
				</h2>
				<nav className='mt-10 space-y-10'>
					<a
						className={`${
							location.pathname === '/internacional'
								? 'text-teal-300'
								: 'text-white'
						} text-2xl block hover:text-teal-300 mt-2`}
						href='/internacional'>
						Certificado de Salud Internacional
					</a>
					<a
						className={`${
							location.pathname === '/rabia'
								? 'text-teal-300'
								: 'text-white'
						} text-2xl block hover:text-teal-300 mt-2`}
						href='/rabia'>
						Certificado de Rabia y CDC
					</a>
					<a
						className={`${
							location.pathname === '/nacional'
								? 'text-teal-300'
								: 'text-white'
						} text-2xl block hover:text-teal-300 mt-2`}
						href='/nacional'>
						Certificado Nacional
					</a>
					<a
						className={`${
							location.pathname === '/nacional'
								? 'text-teal-300'
								: 'text-white'
						} text-2xl block hover:text-teal-300 mt-2`}
						href='/serologia'>
						Serologia Rabia
					</a>
					{/* <a className='flex justify-center pt-8 brightness-150'>
					<img  className=' w-14' src="Logo.png" alt="Logo de la Navegación"/>
					</a> */}
				</nav>
	
			</aside>

			<main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
