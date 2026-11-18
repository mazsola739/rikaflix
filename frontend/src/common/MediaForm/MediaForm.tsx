import { InputField, SingleSelectField, DateField, MultiSelectField, TextAreaField, Button } from 'common'
import { Labels, Placeholders, ButtonText } from 'constant'
import { FormikProps, Formik, Form } from 'formik'
import { InitialValueProps } from 'types'
import { convertMinToString, convertStringToMin } from 'utils'
import { MovieSchema, types, allGenres } from './MediaForm.data'
import { FormContainer, FormGrid, StyledHttp, FormButtons } from './MediaForm.styles'
import { MediaFormProps } from './MediaForm.types'

export const MediaForm = ({ initialValues, handleSubmit }: MediaFormProps) => {
  const handleRunTimeBlur = (e: React.FocusEvent<HTMLInputElement>, props: FormikProps<InitialValueProps>) => {
    const result = convertMinToString(props.values['runtime'])
    props.setFieldValue('runtime', result, false)
    props.handleBlur(e)
  }

  const handleRunTimeFocus = (props: FormikProps<InitialValueProps>) => {
    const result = convertStringToMin(props.values['runtime'])
    props.setFieldValue('runtime', result, false)
  }
  return (
    <FormContainer>
      <Formik initialValues={initialValues} validationSchema={MovieSchema} onSubmit={handleSubmit}>
        {props => (
          <Form role="form">
            <FormGrid>
              <InputField labelName={Labels.TITLE} name={Labels.TITLE} placeholder={Placeholders.MEDIA_TITLE} selectValues={props.values['title']} />
              <SingleSelectField
                labelName={Labels.MEDIA_TYPE}
                name={Labels.MEDIATYPE}
                selectItems={types}
                selectValues={props.values['typeOfShow']}
                setSelectValues={(values: string) => {
                  props.setFieldValue('typeOfShow', values)
                }}
              />{' '}
              <MultiSelectField
                labelName={Labels.GENRE}
                name={Labels.GENRE}
                selectItems={allGenres}
                selectValues={props.values['genre']}
                setSelectValues={(values: string[]) => {
                  props.setFieldValue('genre', values)
                }}
              />
              <DateField labelName={Labels.RELEASE_DATE} name={Labels.RELEASEDATE} placeholder={Placeholders.SELECT_DATE} selectValues={props.values['releaseDate']} />
              <StyledHttp labelName={Labels.IMAGE_URL} name={Labels.IMAGEURL} placeholder={Placeholders.HTTP} selectValues={props.values['posterUrl']} />
              <InputField
                labelName={Labels.RUNTIME}
                name={Labels.RUNTIME}
                placeholder={Placeholders.MINUTES}
                selectValues={props.values['runtime']}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleRunTimeBlur(e, props)}
                onFocus={() => handleRunTimeFocus(props)}
              />
              <StyledHttp labelName={Labels.BACKGROUND_URL} name={Labels.BACKGROUND_URL} placeholder={Placeholders.HTTP} selectValues={props.values['backgroundUrl']} />
              <InputField labelName={Labels.RATING} name={Labels.RATING} placeholder={Labels.RATING} selectValues={`${props.values['rating']}`} step="0.1" type="number" />
            </FormGrid>
            <InputField labelName={Labels.TAGLINE} name={Labels.TAGLINE} placeholder={Labels.TAGLINE} selectValues={props.values['tagline']} />
            <TextAreaField labelName={Labels.OVERVIEW} name={Labels.OVERVIEW} placeholder={Placeholders.DESCRIPTION} />
            <FormButtons>
              <Button color="empty" onClick={() => props.resetForm()} type="reset">
                {ButtonText.RESET}
              </Button>
              <Button type="submit">{ButtonText.SUBMIT}</Button>
            </FormButtons>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}
