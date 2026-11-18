export interface AddProps {
  closeModal: () => void
  /** Called after the show was saved, with its title (opens the success dialog). */
  onAdded: (title: string) => void
}
