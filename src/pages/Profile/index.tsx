import React, { useState } from 'react'

import * as Styled from './styles'
import { AuthPage } from '../../shared/middleware/AuthPage'
import { BottomNavigation } from '../../shared/components/BottomNavigation'
import { Icon } from '../../shared/components/Icon'
import { Auth } from '../../infra/services/Auth'
import { useNavigate } from 'react-router-dom'
import { ProfileHeader } from '../../shared/components/ProfileHeader'
import { useTranslation } from 'react-i18next'
import { BottomSheet } from '../../shared/components/BottomSheet'

const Profile = (): React.ReactElement => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [selectingLanguage, setSelectingLanguage] = useState(false)

  const logout = (): void => {
    if (!confirm(t('profile.logoutQuestion'))) {
      return
    }

    Auth.clear()
    navigate('/')
  }

  return (
    <Styled.MainContainer>
      <BottomNavigation current="profile" />
      <ProfileHeader />

      {selectingLanguage && (
        <BottomSheet title={t('profile.changeTitle')} center onDismiss={() => {
          setSelectingLanguage(false)
        }}>
          <Styled.UpdateLanguageContainer>
            <p>{t('transactions.status.mainTitle')}</p>
            <Styled.UpdateLanguageButtonContainer>
              <Styled.PTBRButton onClick={() => {
                i18n.changeLanguage('pt_BR').then(() => {
                  navigate('/home')
                }).catch(console.error)
              }}>
                {t('language.pt_BR')}
              </Styled.PTBRButton>

              <Styled.ENButton onClick={() => {
                i18n.changeLanguage('en').then(() => {
                  navigate('/home')
                }).catch(console.error)
              }}>
                {t('language.en')}
              </Styled.ENButton>
            </Styled.UpdateLanguageButtonContainer>
          </Styled.UpdateLanguageContainer>
        </BottomSheet>
      )}

      <Styled.BodyContainer>
        <Styled.BodyList>
          <Styled.BodyItem href="#" onClick={() => { navigate('/profile/skeletons') }}>
            {t('skeletons.title')}
            <Styled.BodyItemIcon>
              <Icon name="dollar" />
            </Styled.BodyItemIcon>
          </Styled.BodyItem>
          <Styled.BodyItem active={false} href="#" onClick={() => { navigate('/profile/skeletons') }}>
            {t('general.button.plans')}
            <Styled.BodyItemLabel>{t('general.soon')}</Styled.BodyItemLabel>
          </Styled.BodyItem>
          <Styled.BodyItem href="#" onClick={() => {
            setSelectingLanguage(true)
          }}>
            {t('general.button.language')}
            <Styled.BodyItemIcon>
              <Icon name="gear" />
            </Styled.BodyItemIcon>
          </Styled.BodyItem>
          <Styled.BodyItem danger={true} href="#" onClick={logout}>
            {t('general.button.logout')}
            <Styled.BodyItemIcon>
              <Icon name="signout" />
            </Styled.BodyItemIcon>
          </Styled.BodyItem>
        </Styled.BodyList>
      </Styled.BodyContainer>
    </Styled.MainContainer>
  )
}

export const ProfilePage = AuthPage(Profile)
