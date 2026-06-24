import {Switch} from '@headlessui/react'
import type { TapBioLinks } from "../types"
import { classNames } from '../utils'

type TapBioLinksProps = {
    item: TapBioLinks
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
    handleEnableLink: (socialNetwork: string) => void
}

export function TapBioLinks({item, handleUrlChange, handleEnableLink}: TapBioLinksProps) {
    return(
        <div className="bg-mauve-50 shadow-sm p-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-cover"
             style={{backgroundImage: `url('/social/${item.name}.svg')`}}>

            </div>

            <input type="text" className="flex-1 border border-gray-300 rounded-lg h-8 text-blue-500 px-3"
            name={item.name}
            value={item.url}
            onChange={handleUrlChange}
            />

            <Switch
      checked={item.enabled}
      onChange={() => handleEnableLink(item.name)}
      className={classNames(
          item.enabled ? 'bg-gray-700' : 'bg-gray-300',
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-50 focus:ring-offset-2'
      )}
  >
      <span
          aria-hidden="true"
          className={classNames(
              item.enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
      />
  </Switch>

        </div>
    )
}
