import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

export default function Quiz() {
  const questions = [
    {
      question: "Qual filme ganhou o Oscar de Melhor Filme em 1994?",
      options: [
        "A) Pulp Fiction",
        "B) O Rei Leão",
        "C) Forrest Gump",
        "D) Shawshank Redemption",
      ],
      answer: "c",
    },
    {
      question: "Qual é o filme de maior bilheteria de todos os tempos?",
      options: [
        "A) Vingadores: Ultimato",
        "B) Avatar",
        "C) Titanic",
        "D) Star Wars: O Despertar da Força",
      ],
      answer: "a",
    },
    {
      question: 'Quem dirigiu o filme "A Origem"?',
      options: [
        "A) Steven Spielberg",
        "B) Christopher Nolan",
        "C) Martin Scorsese",
        "D) Quentin Tarantino",
      ],
      answer: "b",
    },
    {
      question: "Qual filme ganhou o Oscar de Melhor Animação em 2001?",
      options: [
        "A) Shrek",
        "B) Monstros S.A.",
        "C) A Viagem de Chihiro",
        "D) Procurando Nemo",
      ],
      answer: "c",
    },
    {
      question:
        "Qual ator interpretou o personagem Wolverine nos filmes dos X-Men?",
      options: [
        "A) Chris Evans",
        "B) Hugh Jackman",
        "C) Robert Downey Jr.",
        "D) Chris Hemsworth",
      ],
      answer: "b",
    },
    {
      question: 'Qual foi o primeiro filme da saga "Harry Potter"?',
      options: [
        "A) Harry Potter e o Cálice de Fogo",
        "B) Harry Potter e a Pedra Filosofal",
        "C) Harry Potter e a Ordem da Fênix",
        "D) Harry Potter e o Prisioneiro de Azkaban",
      ],
      answer: "b",
    },
    {
      question:
        'Quem interpretou o Coringa no filme "Coringa" lançado em 2019?',
      options: [
        "A) Joaquin Phoenix",
        "B) Heath Ledger",
        "C) Jared Leto",
        "D) Jack Nicholson",
      ],
      answer: "a",
    },
    {
      question:
        "Qual é o filme de guerra dirigido por Steven Spielberg lançado em 1998?",
      options: [
        "A) Resgate do Soldado Ryan",
        "B) Apocalipse Now",
        "C) Platoon",
        "D) Pearl Harbor",
      ],
      answer: "a",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [answered, setAnswered] = useState(false);
  const [optionsState, setOptionsState] = useState(
    new Array(questions.length).fill(null)
  );

  const handleAnswer = (selectedOption) => {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
      setScore((prevScore) => ({
        ...prevScore,
        correct: prevScore.correct + 1,
      }));
      setAnswered(true);
      setOptionsState((prev) => {
        const updatedState = [...prev];
        updatedState[currentQuestion] = "correct";
        return updatedState;
      });
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        incorrect: prevScore.incorrect + 1,
      }));
      setAnswered(true);
      setOptionsState((prev) => {
        const updatedState = [...prev];
        updatedState[currentQuestion] = "incorrect";
        return updatedState;
      });
    }
  };

  const nextQuestion = () => {
    setAnswered(false);
    const nextQuestionIndex = currentQuestion + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(nextQuestionIndex);
    } else {
    }
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      <View style={styles.options}>

        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              {
                backgroundColor:
                  answered && optionsState[currentQuestion] === "correct"
                    ? "rgba(0,255,0,0.3)"
                    : answered && optionsState[currentQuestion] === "incorrect"
                    ? "rgba(255,0,0,0.3)"
                    : "#fff",
              },
            ]}
            disabled={answered}
            onPress={() => handleAnswer(String.fromCharCode(97 + index))}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

      </View>
      {answered && <Button title="Próxima Pergunta" onPress={nextQuestion} />}

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Acertos: {score.correct}</Text>
        <Text style={styles.scoreText}>Erros: {score.incorrect}</Text>
      </View>
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#0D214F",
  },
  question: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  options: {
    width: "100%",
    alignItems: "flex-start",
  },
  optionButton: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  scoreContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  scoreText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
