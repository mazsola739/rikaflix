import { Button } from 'common'
import { Constants, ButtonText } from 'constant'
import { useShowContext } from 'helper'
import { useDeleteShowMutation } from 'store'
import { Show } from 'types'
import { DeleteContainer, DeleteTextContainer, DeleteQuestion, DeleteTitle, DeleteButtons } from './Delete.styles'
import { DeleteProps, ManageRequestProps } from './Delete.types'

export const Delete = ({ id, title, year, toggle }: DeleteProps) => {
  const [removeMovie] = useDeleteShowMutation()
  const { refetchShows } = useShowContext()

  const handleRequest = <Type,>({ request, props }: ManageRequestProps<Type>) => {
    request(props).then(response => {
      if ('data' in response) {
        refetchShows()
      } else if ('error' in response) {
        console.log(response)
      }
    })
  }

  return (
    <DeleteContainer>
      <DeleteTextContainer>
        <DeleteQuestion>{Constants.DELETE_MESSAGE}</DeleteQuestion>
        <DeleteTitle>{`${title} (${year})`}</DeleteTitle>
      </DeleteTextContainer>
      <DeleteButtons>
        <Button type="reset" onClick={() => toggle()} color="empty">
          {ButtonText.CANCEL}
        </Button>
        <Button
          type="submit"
          onClick={() =>
            handleRequest<Pick<Show, 'id'>>({
              request: removeMovie,
              props: { id }
            })
          }
        >
          {ButtonText.CONFIRM}
        </Button>
      </DeleteButtons>
    </DeleteContainer>
  )
}
