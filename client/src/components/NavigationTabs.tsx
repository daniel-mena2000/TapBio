import { BookmarkSquareIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router'

const tabs = [
    { name: 'Links', href: '/admin', icon: BookmarkSquareIcon },
    { name: 'Mi Perfil', href: '/admin/profile', icon: UserIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationTabs() {
//useLocation() este es un hook especial de react-router en este caso lo usaremos para saber en que link nos encontramos
    const location = useLocation()
    const navigate = useNavigate()

//Funcion para poder cargar las paginas en movil
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        navigate(e.target.value)
    }
//Tenemos 2 iteraciones a "tabs" una es para dispotivimo movil y otra de escritorio
    return (
        <div className='mb-5'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    onChange={ handleChange }
                >
                    {tabs.map((tab) => (
                        <option
                            value={tab.href}
                            key={tab.name}
                        >{tab.name}</option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                               className={classNames(
  location.pathname === tab.href
    ? "bg-blue-50 text-blue-600"
    : "text-slate-500 hover:bg-slate-100",
  "flex items-center gap-2 rounded-xl px-4 py-2 transition"
)}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
