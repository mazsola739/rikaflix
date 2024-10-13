import { useShowContext } from "../../hooks"
import { Card } from ".."
import { StyledCardList } from "./CardList.styles"

export const CardList = () => {
  const { shows } = useShowContext()

  return (
    <StyledCardList>
      {shows.map((show) => (
        <Card key={show.id} show={show} />
      ))} 
    </StyledCardList>
  )
}
