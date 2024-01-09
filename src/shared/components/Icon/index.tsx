/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from 'react'

import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { type IconDefinition, faSpinner, faMinus, faBars, faHome, faUser, faCaretDown, faArrowRight, faSignOut, faDollarSign, faGear, faPlus, faTimes, faTrash, faPlay } from '@fortawesome/free-solid-svg-icons'

type MappedIconsType = Record<string, IconDefinition>

const mappedIcons: MappedIconsType = {
  spinner: faSpinner,
  user: faUser,
  home: faHome,
  bars: faBars,
  caretDown: faCaretDown,
  arrowRight: faArrowRight,
  signout: faSignOut,
  dollar: faDollarSign,
  gear: faGear,
  plus: faPlus,
  times: faTimes,
  trash: faTrash,
  play: faPlay
}

interface IconProps extends Omit<FontAwesomeIconProps, 'icon'> {
  name: string
}

export const Icon = ({ name, spin = false }: IconProps): React.ReactElement => {
  const icon = (): IconDefinition => {
    if (typeof mappedIcons[name] !== 'undefined') {
      return mappedIcons[name]
    }

    return faMinus
  }

  return (
    <FontAwesomeIcon icon={icon()} spin={spin} />
  )
}
