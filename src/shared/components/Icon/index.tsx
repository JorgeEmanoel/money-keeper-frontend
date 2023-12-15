/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from 'react'

import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { type IconDefinition, faSpinner, faMinus } from '@fortawesome/free-solid-svg-icons'

type MappedIconsType = Record<string, IconDefinition>

const mappedIcons: MappedIconsType = {
  spinner: faSpinner
}

interface IconProps extends Omit<FontAwesomeIconProps, 'icon'> {
  name: string
}

export const Icon = ({ name }: IconProps): React.ReactElement => {
  const icon = (): IconDefinition => {
    if (typeof mappedIcons[name] !== 'undefined') {
      return mappedIcons[name]
    }

    return faMinus
  }

  return (
    <FontAwesomeIcon icon={icon()} />
  )
}
