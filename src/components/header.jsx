import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery, Link as AbsoluteLink } from 'gatsby'
import { Link, useIntl } from 'gatsby-plugin-intl'

import useScrollPosition from '../hooks/useScrollPosition'
import { PrimaryButton } from '../components/button'
import { RowCentered } from '../components/flexbox'
import languageMetadata from '../data/translations'
import { translateMessageId } from '../utils/translations'

import MenuIcon from '../images/menu.inline.svg'
import Logo from '../images/logo.inline.svg'
import GlobeIcon from '../images/globe.inline.svg'
import Carret from '../images/caret.inline.svg'
import TextLogo from '../images/text-logo.inline.svg'

const StyledHeader = styled.header`
    z-index: 99;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 0 1rem 0 6rem;
    height: 4rem;
    position: sticky;
    top: -1px;
    left: 0;
    right: 0;
    transition: background 200ms ease;

    ${({theme, transparentHeader}) => !transparentHeader && `
        background: ${theme.bg1};
        border-bottom: 1px solid ${theme.text2}40;
    `}

    ${({theme}) => theme.media.medium`
        padding: 0 1rem;
        justify-content: space-between;
    `}
`

const StyledTextLogo = styled(TextLogo)`
    display: none;
    height: 16px;

    ${({theme}) => theme.media.medium`
        display: initial;
    `}
`

const LogoLink = styled(Link)`
    height: 2rem;

    & > svg {
        height: 2rem;
    }
`

const LanguagesDropdown = styled(PrimaryButton)`
    background: transparent;
    font-weight: 400;
    font-size: 1rem;
    display: none;
    align-items: center;
    gap: 8px;
    height: auto;
    padding: 0;
    margin: 0;

    & > svg {
        height: 16px;
        fill: ${({theme}) => theme.text1};
        transition: transform 200ms ease;
    }

    ${({theme}) => theme.media.medium`
        display: flex;
    `}
`

const NavLinks = styled.div`
    display: flex;
    gap: 2rem;
    margin-left: 2rem;

    & > a {
        color: ${({theme}) => theme.text1}c0;
    }

    & > a:hover {
        color: ${({theme}) => theme.text1};
    }

    & > .languageLink {
        display: none;
        list-style-type: none;
        margin-left: 1rem;
    }

    ${({theme, open, languageOpen}) => theme.media.medium`
        box-shadow: 0 0 2rem ${theme.black};
        border-radius: 0.5rem;
        flex-direction: column;
        gap: 1rem;
        margin: 0;
        background: ${({theme}) => theme.bg1};
        position: fixed;
        top: 5rem;
        left: 1rem;
        right: 1rem;
        padding: 1rem;
        transition: opacity 0.3s ease, ${open || 'visibility 0s linear 0.3s'};
        opacity: ${open ? '1' : '0'};
        visibility: ${open ? 'visible' : 'hidden'};

        & > a {
            color: ${theme.text1};
        }

        & > ${LanguagesDropdown} > svg {
            ${languageOpen && `transform: rotate(90deg);`}
        }

        ${languageOpen && `
            & > .languageLink {
                display: initial;
            }
        `}
    `}
`

const AppLink = styled.a`
    margin-left: auto;

    ${({theme}) => theme.media.medium`
        display: none;
    `}
`

const StyledLanguagesList = styled.ul`
    box-shadow: 0 0 1rem ${({theme}) => theme.black};
    background: ${({theme}) => theme.bg1};
    position: absolute;
    margin: 0;
    padding: 8px;
    top: 42px;
    left: -1rem;
    right: -1rem;
    list-style-type: none;
    border-radius: 8px;

    & li {
        padding: 8px;
        border-radius: 4px;
    }

    & li:hover {
        background: ${({theme}) => theme.white}10;
        text-decoration: underline;
    }
`

const LanguageButton = styled(RowCentered)`
    cursor: pointer;
    gap: 8px;
    width: 150px;

    & > p {
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        color: ${({theme}) => theme.text2};
        margin: 0;
        font-size: 1rem;
        transition: color 200ms ease;
    }

    & > svg {
        fill: ${({theme}) => theme.text2};
        width: 24px;
        transition: fill 200ms ease;
    }

    & > #carret {
        margin-left: auto;
        height: 12px;
        transition: transform 200ms ease;
    }

    &:hover p {
        color: ${({theme}) => theme.text1};
    }

    &:hover svg {
        fill: ${({theme}) => theme.text1};
    }
`

const LanguageSelection = styled(RowCentered)`
    background: transparent;
    margin: 0 4rem 0 2rem;
    position: relative;

    & > ${StyledLanguagesList} {
        visibility: ${({open}) => open ? 'visible' : 'hidden'};
    }

    ${({theme, open}) => open && `
        & > ${LanguageButton} > #carret {
            transform: rotate(90deg);
        }
    `}

    ${({theme}) => theme.media.medium`
        display: none;
    `}
`

const StyledMenuIcon = styled(MenuIcon)`
    display: none;
    width: 1.5rem;

    ${({open, theme}) => theme.media.medium`
        display: initial;

        & > #close {
            display: ${open ? 'initial' : 'none'};
        }

        & > #menu {
            display: ${open ? 'none' : 'initial'};
        }
    `}
`

const Header = ({pageContext}) => {
    const data = useStaticQuery(graphql`
        query HeaderComponentQuery {
            site {
                siteMetadata {
                    menulinks {
                        name
                        href
                    }
                }
            }
        }
    `)

    const intl = useIntl()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLanguageSelectionOpen, setIsLanguageSelectionOpen] = useState(false)
    const [isHeaderTransparent, setIsHeaderTransparent] = useState(true)

    useScrollPosition(({ currPos }) => {
        setIsHeaderTransparent(currPos.y >= 0)
    })

    const toggleLanguageSelection = useCallback(() => {
        setIsLanguageSelectionOpen(!isLanguageSelectionOpen)
    }, [isLanguageSelectionOpen, setIsLanguageSelectionOpen])

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(!isMenuOpen)
    }, [isMenuOpen, setIsMenuOpen])

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false)
        setIsLanguageSelectionOpen(false)
    }, [setIsMenuOpen, setIsLanguageSelectionOpen])

    return (
        <StyledHeader transparentHeader={isHeaderTransparent} >
            <LogoLink to="/" >
                <Logo/>
            </LogoLink>
            <StyledTextLogo/>
            <NavLinks
                open={isMenuOpen}
                languageOpen={isLanguageSelectionOpen}
            >
                {data.site.siteMetadata.menulinks.map((link, index) =>
                    <Link
                        key={`header-link-${index}`}
                        to={link.href}
                        onClick={closeMenu}
                    >
                        {translateMessageId(link.name, intl)}
                    </Link>
                )}
                <LanguagesDropdown
                    onClick={toggleLanguageSelection}
                >
                    {translateMessageId('language', intl)}
                    <Carret/>
                </LanguagesDropdown>
                <LanguageLinks
                    originalPath={pageContext.intl.originalPath}
                    dismiss={closeMenu}
                />
            </NavLinks>
            <AppLink href='https://app.lambodoge.org' >
                <PrimaryButton>
                    {translateMessageId('use-app', intl)}
                </PrimaryButton>
            </AppLink>
            <LanguageSelection open={isLanguageSelectionOpen} >
                <LanguageButton onClick={toggleLanguageSelection} >
                    <GlobeIcon/>
                    <p>{languageMetadata[pageContext.intl.language].language}</p>
                    <Carret id="carret" />
                </LanguageButton>
                <LanguagesList
                    originalPath={pageContext.intl.originalPath}
                    dismiss={toggleLanguageSelection}
                />
            </LanguageSelection>
            <StyledMenuIcon
                open={isMenuOpen}
                onClick={toggleMenu}
            />
        </StyledHeader>
    )
}

export const LanguageLinks = ({originalPath, dismiss}) => {
    return (
        <>
            {Object.keys(languageMetadata).map((lang) =>
                <AbsoluteLink
                    key={`language-link-${lang}`}
                    className='languageLink'
                    to={`/${lang}${originalPath}`}
                    onClick={dismiss}
                >
                    <li>{languageMetadata[lang].language}</li>
                </AbsoluteLink>
            )}
        </>
    )
}

const LanguagesList = ({originalPath, dismiss}) => {
    return (
        <StyledLanguagesList>
            <LanguageLinks
                originalPath={originalPath}
                dismiss={dismiss}
            />
        </StyledLanguagesList>
    )
}

export default Header
