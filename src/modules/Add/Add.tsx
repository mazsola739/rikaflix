import { MediaForm } from 'common'
import { useShowContext } from 'helper'
import { useCreateShowMutation } from 'store'
import { InitialValueProps } from 'types'
import { getFrontEndForm, getBackEndForm, removeId } from 'utils'
import { defaultValues } from './Add.data'
import { AddContainer } from './Add.styles'
import { AddProps } from './Add.types'

export const Add = ({ closeModal, onAdded }: AddProps) => {
  const [addShow] = useCreateShowMutation()
  const { refetchShows } = useShowContext()
  const convertedInitialValues = getFrontEndForm(defaultValues)

  const handleSubmit = async (values: InitialValueProps) => {
    const convertedValues = getBackEndForm(values)
    const response = await addShow(removeId(convertedValues))
    if ('data' in response) {
      refetchShows()
      closeModal()
      onAdded(response.data?.title ?? values.title)
    } else {
      console.log(response.error)
    }
  }

  return (
    <AddContainer>
      <MediaForm handleSubmit={handleSubmit} initialValues={convertedInitialValues} />
    </AddContainer>
  )
}
