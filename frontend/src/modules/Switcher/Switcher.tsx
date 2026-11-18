import { useRef, useState, useEffect } from 'react'
import { SwitchOptions, SwitchLabel, SwitchRadio, SwitchSlide } from './Switcher.styles'
import { SwitcherProps, HorizontalPositionProps } from './Switcher.type'

export const Switcher = <Option,>({ options, renderItem, name, defaultSelectedItem, slideVerticalPosition = '-6px' }: SwitcherProps<Option>) => {
  const optionHolderRef = useRef<HTMLDivElement | null>(null)
  const [horizontalPosition, setHorizontalPosition] = useState<HorizontalPositionProps>({
    leftPosition: NaN,
    rightPosition: NaN,
    direction: undefined
  })

  const changeSlidePosition = () => {
    const holder = optionHolderRef.current as HTMLDivElement
    const option = holder.querySelector<HTMLInputElement>("[type='radio']:checked")?.labels?.[0] as HTMLLabelElement

    setHorizontalPosition(prevState => ({
      leftPosition: option.offsetLeft,
      rightPosition: holder.offsetWidth - (option.offsetWidth + option.offsetLeft),
      direction: option.offsetLeft > prevState.leftPosition ? 'right' : 'left'
    }))
  }

  useEffect(() => {
    const observeSwitchOptions = new ResizeObserver(changeSlidePosition)

    observeSwitchOptions.observe(optionHolderRef.current as HTMLDivElement)
    return () => {
      observeSwitchOptions.disconnect()
    }
  }, [])

  return (
    <SwitchOptions ref={optionHolderRef}>
      {options.slice(0, 7).map(option => (
        <SwitchLabel key={option as unknown as string}>
          {renderItem(option)}
          <SwitchRadio type="radio" onChange={changeSlidePosition} defaultChecked={option === defaultSelectedItem} name={name} />
        </SwitchLabel>
      ))}
      <SwitchSlide bottomPosition={slideVerticalPosition} horizontalPosition={horizontalPosition} />
    </SwitchOptions>
  )
}
