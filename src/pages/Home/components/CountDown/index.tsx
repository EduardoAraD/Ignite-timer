import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'

import { CyclesContext } from '../../../../contexts/CyclesContext'

import { CountdownContainer, Separator } from './styles'

export function CountDown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    amountSecundsPassed,
    setSecundsPassed,
  } = useContext(CyclesContext)

  const totalSecunds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secundsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secundsDifference >= totalSecunds) {
          markCurrentCycleAsFinished()
          setSecundsPassed(totalSecunds)
          clearInterval(interval)
        } else {
          setSecundsPassed(secundsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, markCurrentCycleAsFinished, setSecundsPassed, totalSecunds])

  const currentSecunds = activeCycle ? totalSecunds - amountSecundsPassed : 0

  const minutesAmount = Math.floor(currentSecunds / 60)
  const secundsAmount = currentSecunds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const secunds = String(secundsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${secunds}`
    }
  }, [activeCycle, minutes, secunds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{secunds[0]}</span>
      <span>{secunds[1]}</span>
    </CountdownContainer>
  )
}
