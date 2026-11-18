import { Poster, RatingRing, CardMenu, Modal } from 'common'
import { ModalText } from 'constant'
import { Edit, Delete } from 'modules'
import { useState, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { getYear, getGenreFormat } from 'utils'
import {
  CardContainer,
  CardImageContainer,
  CardImageWrapper,
  CardRatingWrapper,
  CardDropDown,
  StyledEllipsis,
  CardDetailsContainer,
  CardTitle,
  CardTagline,
  CardYearWrapper,
  CardGenre
} from './Card.styles'
import { CardProps } from './Card.types'

export const Card = ({ media }: CardProps) => {
  const { id, poster_path, title, release_date, genres, tagline, vote_average } = media
  const year = getYear(release_date)
  const genreString = getGenreFormat(genres)

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<'none' | 'edit' | 'delete'>('none')

  const closeModal = () => {
    setActiveModal('none')
  }

  const openModal = (type: 'edit' | 'delete') => () => {
    setActiveModal(type)
    setIsDropDownOpen(false)
  }

  const goUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const openMenu: MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation()
    setIsDropDownOpen(!isDropDownOpen)
  }

  return (
    <CardContainer onClick={() => isDropDownOpen && setIsDropDownOpen(false)}>
      <CardImageContainer onClick={goUp}>
        <Link to={`/shows/${id}`}>
          <CardImageWrapper>
            <Poster data={poster_path} title={title} />
          </CardImageWrapper>
        </Link>
        <CardRatingWrapper>
          <RatingRing vote_average={vote_average} />
        </CardRatingWrapper>
        <CardDropDown onClick={openMenu}>
          <StyledEllipsis />
          {isDropDownOpen && <CardMenu openModal={openModal} />}
        </CardDropDown>
      </CardImageContainer>
      <CardDetailsContainer>
        <CardTitle title={title}>{title}</CardTitle>
        <CardTagline title={tagline}>{tagline}</CardTagline>
        <CardYearWrapper>{year}</CardYearWrapper>
        <CardGenre title={genreString}>{genreString}</CardGenre>
      </CardDetailsContainer>
      <Modal isShown={activeModal === 'edit'} title={ModalText.EDIT_MEDIA} hide={closeModal}>
        <Edit media={media} closeModal={closeModal} />
      </Modal>
      <Modal isShown={activeModal === 'delete'} hide={closeModal} title={ModalText.DELETE_MEDIA}>
        <Delete title={title} year={year} id={id} toggle={closeModal} />
      </Modal>
    </CardContainer>
  )
}
