import React, { FC, useCallback, useMemo, useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { TenFrame } from "./TenFrame"

export const MainView: FC = () => {
  const [currentNumber, setCurrentNumber] = useState(
    Math.floor(Math.random() * 10) + 1
  )
  const [previousNumber, setPreviousNumber] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)

  const availableNumbers = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(
      (n) => n !== currentNumber && n !== previousNumber
    )
  }, [currentNumber, previousNumber])

  const sortNextQuestion = useCallback(() => {
    const index = Math.floor(Math.random() * availableNumbers.length)

    setPreviousNumber(currentNumber)
    setCurrentNumber(availableNumbers[index])
    setInputValue("")
    setQuestionCount((count) => (count === 10 ? 0 : count + 1))
  }, [
    currentNumber,
    availableNumbers,
    setCurrentNumber,
    setPreviousNumber,
    setInputValue,
    setQuestionCount,
  ])

  const handleNextQuestion = useCallback(() => {
    const answer = parseInt(inputValue)
    if (answer === currentNumber) {
      setScore((s) => s + 1)
    }
    sortNextQuestion()
  }, [inputValue, currentNumber, setScore, sortNextQuestion])

  const handleRestart = useCallback(() => {
    sortNextQuestion()
    setPreviousNumber(0)
    setScore(0)
  }, [sortNextQuestion, setPreviousNumber, setScore])

  return (
    <View style={styles.container}>
      {questionCount < 10 ? (
        <>
          <Text style={styles.questionText}>How many red dots are shown?</Text>
          <Button
            title="Next question"
            disabled={!inputValue}
            onPress={handleNextQuestion}
          />
          <TenFrame count={currentNumber} />
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="numeric"
          />
          <Text style={styles.scoreText}>{`Question: ${
            questionCount + 1
          }`}</Text>
        </>
      ) : (
        <>
          <Text
            style={styles.questionText}
          >{`You got ${score} out of ${questionCount}`}</Text>
          <Button title="Restart" onPress={handleRestart} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  questionText: {
    fontSize: 20,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    textAlign: "center",
    width: 30,
  },
  scoreText: {
    fontSize: 20,
    marginTop: 20,
  },
})
