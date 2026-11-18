import { MediaForm } from 'common'
import { useShowContext } from 'helper'
import { useUpdateShowMutation } from 'store'
import { InitialValueProps } from 'types'
import { getFrontEndForm, getBackEndForm } from 'utils'
import { EditContainer } from './Edit.styles'
import { EditProps } from './Edit.types'

export const Edit = ({ closeModal, media }: EditProps) => {
  const convertedInitialValues = getFrontEndForm(media)

  const [updateMovie] = useUpdateShowMutation()
  const { refetchShows } = useShowContext()

  const handleSubmit = async (values: InitialValueProps) => {
    const convertedValues = getBackEndForm(values)
    const response = await updateMovie(convertedValues)

    if ('data' in response) {
      refetchShows()
      closeModal()
    } else {
      console.log(response.error)
    }
  }
  return (
    <EditContainer>
      <MediaForm initialValues={convertedInitialValues} handleSubmit={handleSubmit} />
    </EditContainer>
  )
}
